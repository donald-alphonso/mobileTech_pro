'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase, isSupabaseConfigured, type Lead } from '@/lib/supabase';
import { Search, Mail, Phone, Eye, Calendar, Filter, Users } from 'lucide-react';

export function LeadsManager() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setIsLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: number, newStatus: string) => {
    if (!isSupabaseConfigured() || !supabase) {
      console.warn('Supabase non configuré');
      return;
    }
    try {
      const { error } = await supabase
        .from('leads')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', leadId);

      if (error) throw error;
      await fetchLeads();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-purple-100 text-purple-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'Nouveau';
      case 'contacted': return 'Contacté';
      case 'qualified': return 'Qualifié';
      case 'converted': return 'Converti';
      case 'closed': return 'Fermé';
      default: return status;
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (selectedLead) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => setSelectedLead(null)}>
            ← Retour à la liste
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Détails du Lead</h2>
            <p className="text-gray-600">{selectedLead.first_name} {selectedLead.last_name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informations du Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Prénom</label>
                    <p className="text-lg">{selectedLead.first_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Nom</label>
                    <p className="text-lg">{selectedLead.last_name}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-lg">{selectedLead.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Téléphone</label>
                    <p className="text-lg">{selectedLead.phone || 'Non renseigné'}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Sujet</label>
                  <p className="text-lg">{selectedLead.subject}</p>
                </div>

                {selectedLead.product_name && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Produit concerné</label>
                    <p className="text-lg">{selectedLead.product_name}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-500">Message</label>
                  <div className="bg-gray-50 p-4 rounded-lg mt-2">
                    <p className="whitespace-pre-wrap">{selectedLead.message}</p>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button asChild>
                    <a href={`mailto:${selectedLead.email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Envoyer un email
                    </a>
                  </Button>
                  {selectedLead.phone && (
                    <Button variant="outline" asChild>
                      <a href={`tel:${selectedLead.phone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Appeler
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Gestion du Lead</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Statut actuel</label>
                  <Badge className={`mt-2 ${getStatusColor(selectedLead.status)}`}>
                    {getStatusLabel(selectedLead.status)}
                  </Badge>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Changer le statut</label>
                  <Select 
                    value={selectedLead.status} 
                    onValueChange={(value) => updateLeadStatus(selectedLead.id, value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Nouveau</SelectItem>
                      <SelectItem value="contacted">Contacté</SelectItem>
                      <SelectItem value="qualified">Qualifié</SelectItem>
                      <SelectItem value="converted">Converti</SelectItem>
                      <SelectItem value="closed">Fermé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Méthode de contact préférée</label>
                  <p className="text-lg capitalize">{selectedLead.contact_method}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Date de création</label>
                  <p className="text-lg">
                    {new Date(selectedLead.created_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestion des Leads</h2>
          <p className="text-gray-600">Suivez et gérez vos prospects</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher un lead..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="new">Nouveau</SelectItem>
            <SelectItem value="contacted">Contacté</SelectItem>
            <SelectItem value="qualified">Qualifié</SelectItem>
            <SelectItem value="converted">Converti</SelectItem>
            <SelectItem value="closed">Fermé</SelectItem>
          </SelectContent>
        </Select>

        <div className="text-sm text-gray-600">
          {filteredLeads.length} lead(s) trouvé(s)
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-48 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-32 animate-pulse" />
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {lead.first_name} {lead.last_name}
                        </h3>
                        <p className="text-gray-600">{lead.email}</p>
                        {lead.phone && (
                          <p className="text-gray-500 text-sm">{lead.phone}</p>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{lead.subject}</p>
                        {lead.product_name && (
                          <p className="text-sm text-blue-600">Produit: {lead.product_name}</p>
                        )}
                        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                          {lead.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge className={getStatusColor(lead.status)}>
                        {getStatusLabel(lead.status)}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {new Date(lead.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a href={`mailto:${lead.email}`}>
                          <Mail className="h-4 w-4" />
                        </a>
                      </Button>
                      {lead.phone && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a href={`tel:${lead.phone}`}>
                            <Phone className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && filteredLeads.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun lead trouvé</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all' 
                ? 'Aucun lead ne correspond à vos critères de recherche.' 
                : 'Aucun lead n\'a encore été reçu.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}