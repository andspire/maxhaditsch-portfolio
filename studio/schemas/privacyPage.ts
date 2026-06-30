import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'privacyPage',
  title: 'Privacy Policy',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'controllerText',
      title: 'Controller',
      type: 'text',
      rows: 4,
      description: 'Use \\n for line breaks.',
      initialValue:
        'andspire e.U. — Max Haditsch\n[Street, House No., Postal Code] Vienna, Austria\nEmail: office@maxhaditsch.com',
    }),
    defineField({
      name: 'dataCollectionText',
      title: 'What Data We Collect',
      type: 'text',
      rows: 6,
      description: 'Use double line break (\\n\\n) to start a new paragraph.',
      initialValue:
        'When you visit this website, your browser automatically transmits certain technical information to our server, including IP address, browser type, operating system, referring URL, and the date and time of access. This data is processed exclusively for the purpose of ensuring technical operation and security, and is deleted after a short retention period.\n\nWhen you submit the contact form, we collect the information you provide (name, email address, and message). This data is used solely to respond to your enquiry and is not shared with third parties.',
    }),
    defineField({
      name: 'legalBasisText',
      title: 'Legal Basis',
      type: 'text',
      rows: 4,
      initialValue:
        'Processing of server log data is based on our legitimate interest in the secure and stable operation of this website (Art. 6 para. 1 lit. f GDPR). Processing of contact form data is based on your consent and the purpose of responding to your enquiry (Art. 6 para. 1 lit. b and f GDPR).',
    }),
    defineField({
      name: 'cmsText',
      title: 'Content Management',
      type: 'text',
      rows: 4,
      initialValue:
        'This website uses Sanity (Sanity.io, Inc.) as a headless content management system. Content is retrieved via the Sanity API. No personal data from visitors is stored in or transmitted to Sanity. For more information, see sanity.io/legal/privacy.',
    }),
    defineField({
      name: 'cookiesText',
      title: 'Cookies and Tracking',
      type: 'text',
      rows: 3,
      initialValue:
        'This website does not use tracking cookies, analytics tools, or advertising technologies. No data is shared with advertising networks or third-party analytics providers.',
    }),
    defineField({
      name: 'retentionText',
      title: 'Data Retention',
      type: 'text',
      rows: 3,
      initialValue:
        'Server log data is deleted automatically after 7 days. Contact form submissions are retained for as long as necessary to respond to your enquiry, and deleted thereafter unless a longer retention period is required by law.',
    }),
    defineField({
      name: 'rightsText',
      title: 'Your Rights',
      type: 'text',
      rows: 5,
      description: 'Use double line break (\\n\\n) to start a new paragraph.',
      initialValue:
        'Under the GDPR, you have the right to access, rectification, erasure, restriction of processing, and data portability with respect to your personal data. You also have the right to object to processing based on legitimate interests.\n\nTo exercise any of these rights, please contact us at office@maxhaditsch.com. You also have the right to lodge a complaint with the Austrian Data Protection Authority (Datenschutzbehorde): dsb.gv.at.',
    }),
    defineField({
      name: 'changesText',
      title: 'Changes to This Policy',
      type: 'text',
      rows: 2,
      initialValue:
        'We reserve the right to update this Privacy Policy from time to time. The current version is always available at this URL.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Privacy Policy' }
    },
  },
})
