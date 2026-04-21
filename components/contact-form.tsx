'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Mail, Phone, User, MessageSquare, Send, CircleCheck as CheckCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { contactFormSchema, type ContactFormValues } from '@/lib/validators';

export default function ContactForm({ productName }: { productName?: string }) {
  const defaultValues: ContactFormValues = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    subject: productName ? `Demande d'information - ${productName}` : '',
    message: '',
    contact_method: 'email',
    product_name: productName ?? '',
    website: '',
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const contactMethod = watch('contact_method');

  const onSubmit = async (values: ContactFormValues) => {
    // Honey-pot : si rempli, on simule un succès sans rien insérer
    if (values.website) {
      setSubmitStatus('success');
      reset({ ...defaultValues });
      return;
    }

    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      if (isSupabaseConfigured() && supabase) {
        const { website: _hp, ...payload } = values;
        const { error } = await supabase.from('leads').insert([{ ...payload, status: 'new' }]);
        if (error) throw error;
      } else {
        await new Promise((r) => setTimeout(r, 800));
        console.log('Mode demo, payload:', values);
      }

      setSubmitStatus('success');
      reset({ ...defaultValues });
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
      setErrorMessage("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Contactez-nous
        </CardTitle>
        <CardDescription>
          {productName
            ? `Demandez des informations sur ${productName}`
            : 'Nous sommes là pour répondre à toutes vos questions'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitStatus === 'success' && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === 'error' && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{errorMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Honey-pot invisible : les bots le remplissent, pas les humains */}
          <input
            type="text"
            {...register('website')}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
          />

          <input type="hidden" {...register('product_name')} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Prénom *
              </Label>
              <Input
                id="first_name"
                type="text"
                placeholder="Votre prénom"
                className="w-full"
                {...register('first_name')}
              />
              {errors.first_name && (
                <p className="text-sm text-red-600">{errors.first_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Nom *
              </Label>
              <Input
                id="last_name"
                type="text"
                placeholder="Votre nom"
                className="w-full"
                {...register('last_name')}
              />
              {errors.last_name && (
                <p className="text-sm text-red-600">{errors.last_name.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                className="w-full"
                {...register('email')}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Téléphone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="06 12 34 56 78"
                className="w-full"
                {...register('phone')}
              />
              {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Sujet *</Label>
            <Input
              id="subject"
              type="text"
              placeholder="Objet de votre demande"
              className="w-full"
              {...register('subject')}
            />
            {errors.subject && <p className="text-sm text-red-600">{errors.subject.message}</p>}
          </div>

          <div className="space-y-3">
            <Label>Mode de contact préféré *</Label>
            <RadioGroup
              value={contactMethod}
              onValueChange={(v) =>
                setValue('contact_method', v as ContactFormValues['contact_method'], {
                  shouldValidate: true,
                })
              }
              className="flex flex-col sm:flex-row gap-3"
            >
              <label
                htmlFor="cm-email"
                className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 cursor-pointer hover:bg-gray-50 flex-1"
              >
                <RadioGroupItem value="email" id="cm-email" />
                <span className="text-sm">Email</span>
              </label>
              <label
                htmlFor="cm-phone"
                className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 cursor-pointer hover:bg-gray-50 flex-1"
              >
                <RadioGroupItem value="phone" id="cm-phone" />
                <span className="text-sm">Téléphone</span>
              </label>
              <label
                htmlFor="cm-both"
                className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 cursor-pointer hover:bg-gray-50 flex-1"
              >
                <RadioGroupItem value="both" id="cm-both" />
                <span className="text-sm">Les deux</span>
              </label>
            </RadioGroup>
            {errors.contact_method && (
              <p className="text-sm text-red-600">{errors.contact_method.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              placeholder="Décrivez votre demande en détail..."
              className="min-h-[120px] w-full resize-none"
              {...register('message')}
            />
            {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Envoyer le message
              </>
            )}
          </Button>
        </form>

        {!isSupabaseConfigured() && (
          <Alert className="mt-4 border-amber-200 bg-amber-50">
            <AlertDescription className="text-amber-800">
              Mode démo : Les messages sont affichés dans la console du navigateur.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
