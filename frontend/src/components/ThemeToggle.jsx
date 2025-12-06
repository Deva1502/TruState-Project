import React, { useEffect, useState } from 'react';

const themes = {
    light: {
        '--bg-color': '#f1f5f9',
        '--card-bg': '#ffffff',
        '--text-primary': '#0f172a',
        '--text-secondary': '#475569',
        '--border-color': '#e2e8f0',
        '--primary': '#4f46e5',
        '--hover-bg': '#f8fafc'
    },
    dark: {
        '--bg-color': '#0f172a',
        '--card-bg': '#1e293b',
        '--text-primary': '#f8fafc',
        '--text-secondary': '#94a3b8',
        '--border-color': '#334155',
        '--primary': '#6366f1',
        '--hover-bg': '#2d3748'
    },
    cream: {
        '--bg-color': '#fdfbf7', // warm white
        '--card-bg': '#ffffff',
        '--text-primary': '#422006', // warm brown
        '--text-secondary': '#78350f',
        '--border-color': '#e7e5e4',
        '--primary': '#d97706', // amber
        '--hover-bg': '#fef3c7'
    },
    nordic: {
        '--bg-color': '#eef2f6', // cool gray
        '--card-bg': '#ffffff',
        '--text-primary': '#111936',
        '--text-secondary': '#67748e',
        '--border-color': '#dce0e5',
        '--primary': '#2196f3', // blue
        '--hover-bg': '#e0f2fe'
    },
    forest: {
        '--bg-color': '#f0fdf4', // mint
        '--card-bg': '#ffffff',
        '--text-primary': '#14532d', // dark green
        '--text-secondary': '#166534',
        '--border-color': '#bbf7d0',
        '--primary': '#15803d', // green
        '--hover-bg': '#dcfce7'
    },
    sunset: {
        '--bg-color': '#fff7ed', // orange tint
        '--card-bg': '#ffffff',
        '--text-primary': '#7c2d12', // rust
        '--text-secondary': '#ea580c',
        '--border-color': '#fed7aa',
        '--primary': '#ea580c', // orange
        '--hover-bg': '#ffedd5'
    }
};

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => localStorage.getItem('app-theme') || 'light');

    useEffect(() => {
        const root = document.documentElement;
        const themeVars = themes[theme];
        // Safety check to avoid errors if theme doesn't exist
        if (themeVars) {
            Object.keys(themeVars).forEach(key => {
                root.style.setProperty(key, themeVars[key]);
            });
            localStorage.setItem('app-theme', theme);
        }
    }, [theme]);

    return (
        <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="input"
            style={{ width: 'auto' }}
        >
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
            <option value="cream">Cream Mode</option>
            <option value="nordic">Nordic Blue</option>
            <option value="forest">Forest Green</option>
            <option value="sunset">Sunset Orange</option>
        </select>
    );
};

export default ThemeToggle;
