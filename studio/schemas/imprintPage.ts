import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'imprintPage',
  title: 'Imprint',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'company',  title: 'Company Info' },
    { name: 'legal',    title: 'Legal Sections' },
  ],
  fields: [
    // ── Company Info ──────────────────────────
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      group: 'company',
      initialValue: 'andspire e.U.',
    }),
    defineField({
      name: 'ownerName',
      title: 'Owner Name',
      type: 'string',
      group: 'company',
      initialValue: 'Max Haditsch',
    }),
    defineField({
      name: 'street',
      title: 'Street & House No.',
      type: 'string',
      group: 'company',
    }),
    defineField({
      name: 'postalCity',
      title: 'Postal Code & City',
      type: 'string',
      group: 'company',
      initialValue: '1xx0 Vienna, Austria',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'company',
      initialValue: 'office@maxhaditsch.com',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'company',
      initialValue: '+43 676 90 333 38',
    }),
    defineField({
      name: 'uidNumber',
      title: 'VAT / UID Number',
      type: 'string',
      group: 'company',
    }),
    defineField({
      name: 'tradeAuthorityDistrict',
      title: 'Trade Authority District No.',
      type: 'string',
      group: 'company',
      description: 'e.g. "07" for 7th Bezirk',
    }),
    // ── Legal Sections ────────────────────────
    defineField({
      name: 'professionalLawText',
      title: 'Professional Law',
      type: 'text',
      rows: 3,
      group: 'legal',
      initialValue:
        'Applicable Austrian trade regulations (Gewerbeordnung). Further information is available from the Austrian Federal Economic Chamber: wko.at',
    }),
    defineField({
      name: 'contentResponsibilityText',
      title: 'Content Responsibility',
      type: 'text',
      rows: 2,
      group: 'legal',
      initialValue:
        'Max Haditsch is responsible for the content of this website in accordance with § 18 para. 2 MedienG.',
    }),
    defineField({
      name: 'disclaimerText',
      title: 'Disclaimer',
      type: 'text',
      rows: 3,
      group: 'legal',
      initialValue:
        'Despite careful content control, we assume no liability for the content of external links. The operators of linked pages are solely responsible for their content.',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright',
      type: 'text',
      rows: 3,
      group: 'legal',
      initialValue:
        'All content on this website — including texts, photographs, and design — is protected by copyright and may not be reproduced or used without prior written consent.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Imprint' }
    },
  },
})
