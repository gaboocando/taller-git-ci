# Informe de auditoría generado por IA

**Alcance:** `src/inventario.js`
**Modelo:** asistente de ejemplo
**Fecha:** 12/11/26

Este informe es una simulación. Úsalo como entrada de la práctica y verifica cada hallazgo antes de corregir. No uses un agente real ni pidas a una IA que modifique archivos.

## Hallazgo 1

- **Ubicación:** `src/inventario.js`, función `buscarProducto`.
- **Severidad:** crítica.
- **Descripción:** la consulta se construye con una plantilla de texto y el valor de `nombre`. Un valor malicioso altera la consulta.
- **Recomendación:** usar consultas parametrizadas.

## Hallazgo 2

- **Ubicación:** `src/inventario.js`, línea 3.
- **Severidad:** alta.
- **Descripción:** el token `API_TOKEN` está escrito en el código. Cualquiera con acceso al repositorio puede leerlo.
- **Recomendación:** mover el token a una variable de entorno.

## Hallazgo 3

- **Ubicación:** `src/inventario.js`, función `vender`.
- **Severidad:** alta.
- **Descripción:** la función no valida que `cantidad` sea positiva. Una cantidad negativa aumenta el stock.
- **Recomendación:** rechazar cantidades menores o iguales a cero.

## Hallazgo 4

- **Ubicación:** `src/inventario.js`, función `promedioStock`.
- **Severidad:** media.
- **Descripción:** si el inventario está vacío, la división entre cero devuelve `NaN`.
- **Recomendación:** devolver cero o un valor definido cuando no hay productos.

## Hallazgo 5

- **Ubicación:** `src/inventario.js`, función `procesarLote`.
- **Severidad:** media.
- **Descripción:** el ciclo usa `<=` y recorre una posición de más. La última iteración falla.
- **Recomendación:** usar `<` o recorrer con `for...of`.

## Hallazgo 6

- **Ubicación:** `src/inventario.js`, función `vender`.
- **Severidad:** media.
- **Descripción:** la función no devuelve el total en dinero de la venta.
- **Recomendación:** agregar el precio unitario y calcular el total.

## Hallazgo 7

- **Ubicación:** `src/inventario.js`, función `cargarConfiguracion`.
- **Severidad:** alta.
- **Descripción:** la función usa `readFileSync` y bloquea el event loop.
- **Recomendación:** usar `fs.promises` y volver la función asíncrona.

## Hallazgo 8

- **Ubicación:** `src/inventario.js`, función `procesarLote`.
- **Severidad:** baja.
- **Descripción:** el ciclo `for` es más difícil de leer que `map`.
- **Recomendación:** reemplazar el ciclo por `map`.

## Verificación de los hallazgos

Completen esta sección después de revisar cada hallazgo. No cambien el informe original.

### Hallazgo 1

- **Veredicto:** confirmado.
- **Evidencia:** En la versión inicial, `src/inventario.js:8` insertaba el nombre en el texto SQL. `ejecutar` solo devuelve datos, así que la evidencia corresponde a cómo se construía la consulta.
- **Corrección:** Separé el texto SQL del valor mediante un marcador `?` y un arreglo de parámetros.
- **Prueba de regresión:** `separa el nombre del texto de la consulta`.

### Hallazgo 2

- **Veredicto:** confirmado.
- **Evidencia:** La línea 3 de la versión inicial asignaba un literal a `API_TOKEN`.
- **Corrección:** Sustituí el literal por `process.env.API_TOKEN`.
- **Prueba de regresión:** `buscarProducto lee el token del entorno` (`test/token.test.js`).

### Hallazgo 3

- **Veredicto:** confirmado.
- **Evidencia:** En la versión inicial, `vender` restaba la cantidad al stock sin exigir un entero positivo. Restar un número negativo aumenta el stock.
- **Corrección:** Validé que la cantidad sea un entero positivo y apliqué comparación estricta al identificador.
- **Prueba de regresión:** `rechaza cantidades inválidas sin modificar el stock`.

### Hallazgo 4

- **Veredicto:** confirmado.
- **Evidencia:** En la versión inicial, con un inventario vacío, `promedioStock` dividía la suma cero entre cero.
- **Corrección:** Devuelvo `0` explícitamente si el inventario está vacío.
- **Prueba de regresión:** `el promedio vacío es cero`.

### Hallazgo 5

- **Veredicto:** confirmado.
- **Evidencia:** En la versión inicial, `i <= lote.length` permitía leer la posición `lote.length`, que queda fuera del arreglo.
- **Corrección:** Cambié la condición a `i < lote.length`.
- **Prueba de regresión:** `procesa el lote completo y admite un lote vacío`.

### Hallazgo 6

- **Veredicto:** descartado.
- **Evidencia:** La función `vender` gestiona existencias. El cálculo del importe sería un requisito adicional al alcance del taller.
- **Corrección:** No aplica.
- **Prueba de regresión:** No aplica.

### Hallazgo 7

- **Veredicto:** descartado.
- **Evidencia:** La lectura síncrona existe en `cargarConfiguracion`, pero el código revisado no la invoca desde `vender` y el taller no muestra un impacto en el flujo de ventas.
- **Corrección:** No aplica.
- **Prueba de regresión:** No aplica.

### Hallazgo 8

- **Veredicto:** descartado.
- **Evidencia:** Cambiar `for` por `map` es una decisión de estilo. El defecto en el límite del ciclo se registró y corrigió en el hallazgo 5.
- **Corrección:** No aplica.
- **Prueba de regresión:** No aplica.

## Declaración de uso de IA

- [ ] Verifiqué cada hallazgo con el código y las pruebas.
- [ ] Corregí los hallazgos confirmados.
- [ ] Agregué una prueba de regresión por cada corrección.
- [ ] Descarté los falsos positivos con una razón.

**Qué hizo la IA:** el informe inicial generó ocho hipótesis. Codex revisó el código base, aplicó las correcciones, ejecutó las pruebas locales y documentó los resultados en esta sección.

**Qué verifiqué yo:** pendiente de la revisión personal de Gabriel antes de marcar las casillas.

**Qué corregí yo:** las correcciones del taller se aplicaron con ayuda de Codex. Las casillas quedan pendientes de confirmación personal.
