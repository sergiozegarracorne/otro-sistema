# Componentes UI Reutilizables

Esta carpeta contiene componentes reutilizables para la aplicación. Todos los componentes están diseñados para ser flexibles, accesibles y fáciles de usar.

## Componentes Disponibles

### 1. Button
Componente de botón con múltiples variantes y estados.

```tsx
import { Button } from '@/components/ui';

// Uso básico
<Button>Click me</Button>

// Con variantes
<Button variant="primary">Primario</Button>
<Button variant="secondary">Secundario</Button>
<Button variant="danger">Peligro</Button>
<Button variant="success">Éxito</Button>
<Button variant="outline">Outline</Button>

// Con tamaños
<Button size="sm">Pequeño</Button>
<Button size="md">Mediano</Button>
<Button size="lg">Grande</Button>

// Con iconos
<Button 
  leftIcon={<Icon />} 
  rightIcon={<Icon />}
>
  Con iconos
</Button>

// Con estado de carga
<Button isLoading>Procesando...</Button>
```

### 2. Input
Componente de input con validación y diferentes tipos.

```tsx
import { Input } from '@/components/ui';

// Uso básico
<Input 
  label="Nombre"
  placeholder="Tu nombre"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

// Con validación
<Input 
  label="Email"
  type="email"
  error="El email es requerido"
  isRequired
/>

// Con iconos
<Input 
  label="Búsqueda"
  leftIcon={<SearchIcon />}
  rightIcon={<FilterIcon />}
/>

// Con toggle de contraseña
<Input 
  label="Contraseña"
  type="password"
  showPasswordToggle
/>

// Con diferentes tamaños
<Input size="sm" />
<Input size="md" />
<Input size="lg" />
```

### 3. Modal
Componente modal para diálogos y ventanas emergentes.

```tsx
import { Modal } from '@/components/ui';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmar Acción"
  size="md"
>
  <p>¿Estás seguro de que quieres continuar?</p>
  <div className="flex space-x-3 mt-4">
    <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
    <Button variant="primary">Confirmar</Button>
  </div>
</Modal>
```

### 4. Loading
Componente de carga con diferentes variantes.

```tsx
import { Loading } from '@/components/ui';

// Spinner básico
<Loading />

// Con texto
<Loading text="Cargando datos..." />

// Con diferentes variantes
<Loading variant="spinner" />
<Loading variant="dots" />
<Loading variant="pulse" />
<Loading variant="bars" />

// Con diferentes tamaños
<Loading size="sm" />
<Loading size="md" />
<Loading size="lg" />
<Loading size="xl" />

// Como overlay
<Loading overlay text="Procesando..." />

// Con contenido
<Loading>
  <div>Contenido que se está cargando</div>
</Loading>
```

### 5. Card
Componente de tarjeta para mostrar información.

```tsx
import { Card } from '@/components/ui';

// Card básica
<Card>
  <p>Contenido de la tarjeta</p>
</Card>

// Con título y subtítulo
<Card 
  title="Título de la Tarjeta"
  subtitle="Descripción breve"
>
  <p>Contenido</p>
</Card>

// Con diferentes variantes
<Card variant="default">Default</Card>
<Card variant="outlined">Outlined</Card>
<Card variant="elevated">Elevated</Card>
<Card variant="flat">Flat</Card>

// Con hover effect
<Card hover>
  <p>Tarjeta con efecto hover</p>
</Card>

// Con header y footer personalizados
<Card 
  header={<div>Header personalizado</div>}
  footer={<div>Footer personalizado</div>}
>
  <p>Contenido</p>
</Card>

// Con click handler
<Card onClick={() => console.log('Clicked!')}>
  <p>Tarjeta clickeable</p>
</Card>
```

## Importación

Puedes importar todos los componentes de una vez:

```tsx
import { Button, Input, Modal, Loading, Card } from '@/components/ui';
```

O importar individualmente:

```tsx
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
// etc...
```

## Personalización

Todos los componentes aceptan una prop `className` para personalización adicional:

```tsx
<Button className="my-custom-class">Botón personalizado</Button>
<Input className="w-full max-w-md" />
<Card className="bg-blue-50 border-blue-200" />
```

## Accesibilidad

Los componentes están diseñados con accesibilidad en mente:
- Soporte para lectores de pantalla
- Navegación por teclado
- Estados de focus visibles
- Etiquetas apropiadas
- Roles ARIA cuando es necesario

## TypeScript

Todos los componentes están completamente tipados con TypeScript, proporcionando autocompletado y verificación de tipos en tiempo de desarrollo.
