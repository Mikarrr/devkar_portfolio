import type { Block } from 'payload'

export const PortfolioPage: Block = {
  slug: 'portfolioPage',
  interfaceName: 'PortfolioPage',
  labels: {
    singular: 'Strona Portfolio',
    plural: 'Strony Portfolio',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tytuł sekcji',
      defaultValue: 'MOJE PORTFOLIO',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Opis',
      defaultValue:
        'Z niecierpliwością oczekuję na kontakt mailowy lub telefoniczny od Ciebie w sprawie potencjalnych współprac, zapytań czy też po prostu na przyjazną i kreatywną dyskusję.',
    },
    {
      name: 'showFilter',
      type: 'checkbox',
      label: 'Pokaż filtr kategorii',
      defaultValue: true,
    },
    {
      name: 'projectsPerPage',
      type: 'number',
      label: 'Liczba projektów na stronę',
      defaultValue: 10,
      min: 1,
      max: 50,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Filtruj kategorie (pozostaw puste aby pokazać wszystkie)',
    },
  ],
}
