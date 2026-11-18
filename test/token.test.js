import { test } from 'bun:test';
import assert from 'node:assert/strict';

test('buscarProducto lee el token del entorno', async () => {
  const tokenAnterior = process.env.API_TOKEN;
  process.env.API_TOKEN = 'token-ficticio-de-prueba';

  try {
    const { buscarProducto } = await import('../src/inventario.js?token=entorno');
    assert.equal(buscarProducto('Teclado').token, 'token-ficticio-de-prueba');
  } finally {
    if (tokenAnterior === undefined) {
      delete process.env.API_TOKEN;
    } else {
      process.env.API_TOKEN = tokenAnterior;
    }
  }
});
