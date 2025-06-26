// src/data/tiposDeEntradas.js

// Usamos 'export' para poder importar esta variable en otros archivos.
export const tiposDeEntradas = [
  {
    id: 'gral-diaria',
    tipo: 'Entrada General Diaria',
    descripcion: 'Acceso a todos los escenarios por un día.',
    precioPreventa: '$2500 ARS',
    precioPuerta: '$3000 ARS',
    textoBoton: 'Comprar Diaria'
  },
  {
    id: 'abono-gral',
    tipo: 'Abono General (3 días)',
    descripcion: 'Acceso completo a los tres días del festival.',
    precioPreventa: '$6000 ARS',
    precioPuerta: '$7500 ARS',
    textoBoton: 'Comprar Abono'
  },
  {
    id: 'vip-diaria',
    tipo: 'Entrada VIP Diaria',
    descripcion: 'Acceso preferencial, área VIP, consumiciones.',
    precioPreventa: '$5000 ARS',
    precioPuerta: '$6000 ARS',
    textoBoton: 'Comprar VIP Diaria'
  },
  {
    id: 'abono-vip',
    tipo: 'Abono VIP (3 días)',
    descripcion: 'Experiencia VIP completa para todo el festival.',
    precioPreventa: '$12000 ARS',
    precioPuerta: '$15000 ARS',
    textoBoton: 'Comprar Abono VIP'
  }
];