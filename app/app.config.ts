export default defineAppConfig({
  ui: {
    colors: {
      // Scales defined in `app/assets/css/main.css`: crimson-700 is the brand crimson, crimson-900
      // the wine; obsidian runs from ivory (100) to obsidian (950).
      primary: 'crimson',
      neutral: 'obsidian',
    },
    button: {
      compoundVariants: [
        {
          // Nuxt UI paints dark-mode solid buttons with the light text tint and dark text. The
          // signature action is the brand crimson itself, with ivory type (6.7:1); wine on hover.
          color: 'primary',
          variant: 'solid',
          class:
            'text-ivory bg-crimson hover:bg-wine active:bg-wine disabled:bg-crimson aria-disabled:bg-crimson outline-crimson-400/40',
        },
      ],
    },
  },
})
