
# ZARA CHALLENGE

## INTRODUCCIÓN
El objetivo de esta prueba es la creación de una aplicación web enfocada en la visualización, búsqueda y gestión de un catálogo de teléfonos móviles. La aplicación debe permitir a los usuarios consultar detalles específicos de cada dispositivo, así como gestionar un carrito de compras de manera eficiente.
---

## FUNCIONALIDADES Y ESTRUCTURA
La aplicación deberá contener tres vistas principales:

### 1. Vista Listado de Teléfonos
**Requerimientos:**
*   Implementar una cuadrícula con tarjetas que muestren los primeros 20 teléfonos provenientes de la API.
    *   Cada tarjeta deberá incluir imagen, nombre, marca y precio base.
*   Implementar un buscador en tiempo real que filtre los teléfonos por nombre o marca (Usar filtrado por API).
*   El buscador debe incluir un indicador con el número de resultados encontrados.
*   Implementar una barra de navegación que contenga:
    *   Un icono con un enlace al panel de inicio.
    *   Un icono que muestre la cantidad de teléfonos en el carrito.
        *   El carrito debe de ser persistente, se puede manejar su estado haciendo uso de localStorage.
*   Al hacer clic en un teléfono, deberá redirigir a la vista de detalle del mismo.





### 2. Vista Detalle de Teléfono

**Requerimientos:**
Mostrar detalles del teléfono seleccionado, incluyendo:
*   Nombre y marca del dispositivo.
*   Imagen grande del móvil, con capacidad de cambiar dinámicamente según el color seleccionado.
*   Selectores para almacenamiento y color, con actualización en tiempo real del precio.
*   Especificaciones técnicas detalladas, precio base y variaciones según almacenamiento.
*   Un botón "Añadir al carrito" que solo se activará cuando se hayan seleccionado color y almacenamiento.
*   Una sección de "Productos similares" en la parte inferior.
3. Vista de Carrito

**Requerimientos:**
Mostrar los teléfonos añadidos al carrito, con:
*   Imagen, nombre, especificaciones seleccionadas (almacenamiento / color) y precio individual.
*   Implementar un botón para eliminar productos individuales del carrito.
*   Mostrar el precio total de la compra.
*   Un botón de "Continuar comprando" que redirija a la vista principal.

DISEÑO
El diseño de las vistas deberá ser responsive y ajustarse a los diseños definidos en Figma
*   [Diseños de figma](https://www.figma.com/design/Nuic7ePgOfUQ0hcBrUUQrb/Labs-%2F-Zara-Web-Challenge-(Smartphones)?node-id=0-1&m=dev&t=70pTEDeKhVCCV25p-1)
*   [Prototipo de figma](https://www.figma.com/proto/Nuic7ePgOfUQ0hcBrUUQrb/Labs-%2F-Zara-Web-Challenge-(Smartphones)?page-id=1%3A121&node-id=20620-406&node-type=canvas&viewport=-127%2C-2609%2C0.17&t=kBCv81QvTf1Tbzjs-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=20620%3A1497&show-proto-sidebar=1)
*   FUENTES: Para las fuentes de la aplicación se deberá utilizar: font-family: Helvetica, Arial, sans-serif;


## MODO DESARROLLO Y MODO PRODUCCIÓN
La aplicación deberá incluir dos modos:
*   **Modo Desarrollo:** Servir los assets sin minimizar.
*   **Modo Producción:** Servir los assets concatenados y minimizados.

## PRESENTACIÓN
El objetivo final es presentar un repositorio de código público (en plataformas como GitHub o Bitbucket) con la solución desarrollada. El repositorio debe incluir un archivo README con las instrucciones para ejecutar la aplicación, una explicación de la arquitectura y estructura del proyecto, y cualquier información relevante.

## DOCUMENTACIÓN Y UTILIDADES
**API REST:**
Puedes consultar los detalles completos de la API en el siguiente [enlace](https://prueba-tecnica-api-tienda-moviles.onrender.com/docs/). 
**Autenticación de la API REST:**
Todas las solicitudes a la API deben estar autenticadas. Para ello, es necesario incluir en el encabezado "x-api-key" el valor: 87909682e6cd74208f41a6ef39fe4191 en cada llamada.

## STACK TECNOLÓGICO
*   **Frontend:** React >= 17, CSS, SASS o StyledComponents.
*   **Backend:** Node 18.
*   **Gestión de Estado:** React Context API.
*   **Autenticación:** Manejo del parámetro x-api-key en las peticiones.



## REQUISITOS:
*   Implementación de pruebas (testing).
*   La aplicación debe ser responsive.
*   Correcta accesibilidad.
*   Uso de linters y formatters.
*   La consola del navegador debe estar libre de errores y advertencias.
*   Incluir un README detallado.

## OPCIONAL:
*   Despliegue de la aplicación.
*   Uso de SSR (Server Side Rendering) con Next.js.
*   Uso de variables CSS.

## CONTACTO
Si tienes dudas o necesitas aclaraciones, no dudes en contactarnos a través del correo: ddfrontendzara.com@inditex.com.

---

## CHECKLIST DE IMPLEMENTACIÓN

### Vista Listado de Teléfonos
- [x] Grid con los 20 teléfonos de la API — imagen, nombre, marca y precio base
- [x] Buscador en tiempo real por nombre/marca (con debounce 300 ms)
- [x] Indicador del número de resultados
- [x] Navegación con icono/enlace al home
- [x] Navegación con icono + contador del carrito
- [x] Carrito persistente con `localStorage`
- [x] Click en tarjeta → redirige al detalle

### Vista Detalle de Teléfono
- [x] Nombre y marca del dispositivo
- [x] Imagen grande que cambia al seleccionar color
- [x] Selectores de almacenamiento y color con precio en tiempo real
- [x] Especificaciones técnicas, precio base y variaciones por almacenamiento
- [x] Botón "Añadir al carrito" desactivado hasta seleccionar color Y almacenamiento
- [x] Sección de productos similares

### Vista de Carrito
- [x] Imagen, nombre, especificaciones seleccionadas y precio individual
- [x] Botón eliminar producto individual
- [x] Precio total
- [x] Botón "Continuar comprando" → home

### Diseño y técnico
- [x] Font: `Helvetica, Arial, sans-serif`
- [x] Diseño responsive (mobile-first)
- [x] Modo desarrollo sin minificar / producción minificada (Vite)

### Requisitos
- [x] Implementación de pruebas (Vitest + React Testing Library)
- [x] Aplicación responsive
- [x] Accesibilidad (ARIA, skip nav, soporte teclado)
- [x] Linters y formatters (ESLint + Prettier, 0 warnings)
- [x] Consola libre de errores y advertencias
- [x] README detallado

### Opcional
- [x] Despliegue (Render + GitHub Pages)
- [x] Variables CSS (sistema completo de tokens)
- [ ] SSR con Next.js *(no aplicable — el proyecto usa React SPA puro)*

