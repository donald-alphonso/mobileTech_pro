/*
  # Contraintes anti-abus sur la table leads

  La policy d'INSERT publique sur `leads` (`WITH CHECK (true)`) est nécessaire
  pour le formulaire de contact, mais sans contraintes elle permet l'envoi de
  payloads arbitrairement longs. Ces CHECKs limitent la taille des champs au
  niveau base, indépendamment de la validation côté client (Zod).
*/

ALTER TABLE leads
  ADD CONSTRAINT leads_first_name_length CHECK (char_length(first_name) BETWEEN 1 AND 80),
  ADD CONSTRAINT leads_last_name_length  CHECK (char_length(last_name)  BETWEEN 1 AND 80),
  ADD CONSTRAINT leads_email_length      CHECK (char_length(email)      BETWEEN 3 AND 254),
  ADD CONSTRAINT leads_phone_length      CHECK (phone IS NULL OR char_length(phone) <= 30),
  ADD CONSTRAINT leads_subject_length    CHECK (char_length(subject)    BETWEEN 1 AND 200),
  ADD CONSTRAINT leads_message_length    CHECK (char_length(message)    BETWEEN 1 AND 5000),
  ADD CONSTRAINT leads_product_name_length CHECK (product_name IS NULL OR char_length(product_name) <= 200);
