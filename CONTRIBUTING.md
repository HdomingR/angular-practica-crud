# Contributing Guide
 
## Flujo de trabajo GitFlow
 
Las ramas siguen esta estructura:
- `main` — código en producción, protegida
- `develop` — rama de integración
- `feat/nombre` — nuevas funcionalidades
- `fix/nombre` — corrección de bugs
- `refactor/nombre` — refactorización de código
 
Nunca se hace commit directamente a `main` o `develop`.
 
## Convenciones de commits
 
Seguimos el estándar [Conventional Commits](https://www.conventionalcommits.org/):
 
- `feat:` — nueva funcionalidad
- `fix:` — corrección de bug
- `refactor:` — refactorización sin cambio de funcionalidad
- `style:` — cambios de estilos
- `docs:` — cambios en documentación
- `test:` — añadir o modificar tests
- `chore:` — tareas de mantenimiento
 
Ejemplo:
```
feat: add car create component
fix: fix date format in car details
```
 
## Proceso de Pull Request
 
1. Crea una rama desde `develop` con el nombre adecuado
2. Desarrolla la funcionalidad
3. Asegúrate de que los tests pasan con `ng test`
4. Abre una Pull Request hacia `develop`
5. Añade un revisor
6. Espera la aprobación antes de hacer merge
 
## Estándares de código
 
- Todos los nombres de componentes, métodos y variables en **inglés**
- Usar **signals** e **inputs** de Angular 19
- Documentar con **JSDoc** los métodos públicos
- Mínimo **80% de code coverage**
- El código debe pasar **ESLint** y **Prettier** antes del commit