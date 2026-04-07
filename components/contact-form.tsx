'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Phone, User, MessageSquare, Send, CircleCheck as CheckCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  product?: string;
}

export default function ContactForm({ productName }: { productName?: string }) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: productName ? `Demande d'information - ${productName}` : '',
    message: '',
    product: productName || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from('leads')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              subject: formData.subject,
              message: formData.message,
              product: formData.product,
              status: 'nouveau',
              source: 'contact_form'
            }
          ]);

        if (error) {
          throw error;
        }
      } else {
        // Simulation d'envoi pour la démo
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Formulaire soumis (mode démo):', formData);
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: productName ? `Demande d'information - ${productName}` : '',
        message: '',
        product: productName || ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
      setErrorMessage('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
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
            : 'Nous sommes là pour répondre à toutes vos questions'
          }
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
            <AlertDescription className="text-red-800">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Nom complet *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Votre nom complet"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="votre@email.com"
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Téléphone
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="06 12 34 56 78"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Sujet *</Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleInputChange}
                required
                placeholder="Objet de votre demande"
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="Décrivez votre demande en détail..."
              className="min-h-[120px] w-full resize-none"
            />
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

        {!isSupabaseConfigured && (
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