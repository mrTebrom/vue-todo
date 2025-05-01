import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
    components,
    directives,
    defaultTheme: 'customLight',
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi },
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                dark: false,
                colors: {
                    background: '#f5f5f5',
                    surface: '#ffffff',
                    primary: '#1976d2',
                    onPrimary: '#ffffff',
                    onBackground: '#2c3e50',      // ✅ нужно
                    onSurface: '#2c3e50',         // ✅ нужно
                },
            },
            dark: {
                dark: true,
                colors: {
                    background: '#121212',
                    surface: '#1e1e1e',
                    primary: '#90caf9',
                    onPrimary: '#000000',
                    onBackground: '#ffffff',     // ✅ нужно
                    onSurface: '#ffffff',        // ✅ нужно
                },
            },
        },
    },
});

