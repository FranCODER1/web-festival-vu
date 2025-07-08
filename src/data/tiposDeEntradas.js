// src/data/tiposDeEntradas.js

export const tiposDeEntradas = [
  {
    id: 'gral-diaria',
    tipo: 'Entrada General Diaria',
    descripcion: 'Acceso a todos los escenarios por un día.',
    precioPreventa: '$2500 ARS',
    precioPuerta: '$3000 ARS',
    textoBoton: 'Comprar Diaria',
    eventoIdTarget: null, // El usuario debe elegir el día (Día 1, 2 o 3)
    tipoEntradaTarget: 'General'
  },
  {
    id: 'abono-gral',
    tipo: 'Abono General (3 días)',
    descripcion: 'Acceso completo a los tres días del festival.',
    precioPreventa: '$6000 ARS',
    precioPuerta: '$7500 ARS',
    textoBoton: 'Comprar Abono',
    eventoIdTarget: 'abono-general-3-dias-2025', // ID del evento "Abono" en eventos.json
    tipoEntradaTarget: 'General'
  },
  {
    id: 'vip-diaria',
    tipo: 'Entrada VIP Diaria',
    descripcion: 'Acceso preferencial, área VIP, consumiciones.',
    precioPreventa: '$5000 ARS',
    precioPuerta: '$6000 ARS',
    textoBoton: 'Comprar VIP Diaria',
    eventoIdTarget: null, // El usuario debe elegir el día
    tipoEntradaTarget: 'VIP'
  },
  {
    id: 'abono-vip',
    tipo: 'Abono VIP (3 días)',
    descripcion: 'Experiencia VIP completa para todo el festival.',
    precioPreventa: '$12000 ARS',
    precioPuerta: '$15000 ARS',
    textoBoton: 'Comprar Abono VIP',
    eventoIdTarget: 'abono-general-3-dias-2025', // ID del evento "Abono" en eventos.json
    tipoEntradaTarget: 'VIP'
  }
];