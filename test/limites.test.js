import { test } from 'bun:test';
import assert from 'node:assert/strict';

import { agregarProducto, buscarProducto, procesarLote, vender } from '../src/inventario.js';

test('separa el nombre del texto de la consulta', () => {
  const normal = buscarProducto('Mesa');
  const conApostrofo = buscarProducto("O'Connor");

  assert.equal(normal.consulta, 'SELECT * FROM productos WHERE nombre = ?');
  assert.equal(conApostrofo.consulta, normal.consulta);
  assert.deepEqual(normal.parametros, ['Mesa']);
  assert.deepEqual(conApostrofo.parametros, ["O'Connor"]);
});

test('rechaza cantidades inválidas sin modificar el stock', () => {
  const producto = agregarProducto({ id: 10, nombre: 'Silla', stock: 5 });
  for (const cantidad of [-3, 0, 1.5]) {
    assert.deepEqual(vender(10, cantidad), { ok: false, mensaje: 'Cantidad inválida' });
    assert.equal(producto.stock, 5);
  }
});

test('el promedio vacío es cero', async () => {
  const { promedioStock } = await import('../src/inventario.js?inventario=vacio');
  assert.equal(promedioStock(), 0);
});

test('procesa el lote completo y admite un lote vacío', () => {
  assert.deepEqual(procesarLote([{ id: 1 }, { id: 2 }]), [1, 2]);
  assert.deepEqual(procesarLote([]), []);
});
