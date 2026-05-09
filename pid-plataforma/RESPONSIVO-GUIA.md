# 📱 Guia Rápido de Responsividade

## Padrões para usar no projeto PID

### 1. Container Responsivo
```jsx
<div className="container mx-auto px-4 md:px-8 lg:px-12">
  {/* Conteúdo */}
</div>
```

### 2. Layout Duas Colunas (Hero/Split)
```jsx
<div className="flex flex-col lg:flex-row min-h-screen">
  <div className="flex-1 p-8 md:p-12 lg:p-14">Esquerda</div>
  <div className="flex-1 p-8 md:p-12 lg:p-14">Direita</div>
</div>
```

### 3. Sidebar/Painel Lateral
```jsx
{/* Desktop: sidebar fixa | Mobile: drawer full-screen */}
<div className={`
  fixed lg:relative
  ${aberto ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
  w-full max-w-[280px] lg:w-[280px]
  h-full transition-transform duration-300
  bg-white shadow-xl lg:shadow-none
  z-50 lg:z-0
`}>
  {/* Conteúdo */}
</div>
```

### 4. Grid Responsivo
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {items.map(item => <Card key={item.id} />)}
</div>
```

### 5. Tipografia Responsiva
```jsx
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Título</h1>
<p className="text-sm md:text-base lg:text-lg">Parágrafo</p>
```

### 6. Botões Responsivos
```jsx
<button className="
  px-4 py-2 md:px-6 md:py-3
  text-sm md:text-base
  rounded-lg
  w-full sm:w-auto
">
  Botão
</button>
```

### 7. Espaçamento Responsivo
```jsx
{/* Margens */}
<div className="mt-4 md:mt-8 lg:mt-12">

{/* Gaps */}
<div className="flex gap-2 md:gap-4 lg:gap-6">

{/* Padding */}
<div className="p-4 md:p-6 lg:p-8">
```

### 8. Overlay Mobile (para modais/drawers)
```jsx
{aberto && (
  <div 
    onClick={() => setAberto(false)}
    className="fixed inset-0 bg-black/40 lg:hidden z-40"
  />
)}
```

### 9. Navbar Responsivo
```jsx
<nav className="sticky top-0 z-50 bg-white border-b">
  <div className="flex items-center justify-between px-4 md:px-8 h-16">
    {/* Logo */}
    <div className="flex items-center gap-2">Logo</div>
    
    {/* Links Desktop */}
    <div className="hidden md:flex gap-4">Links</div>
    
    {/* Menu Mobile */}
    <button className="md:hidden">☰</button>
  </div>
</nav>
```

### 10. Cards Responsivos
```jsx
<div className="
  bg-white rounded-lg shadow-md
  p-4 md:p-6
  hover:shadow-lg transition-shadow
">
  <h3 className="text-lg md:text-xl font-bold mb-2">Título</h3>
  <p className="text-sm md:text-base text-gray-600">Descrição</p>
</div>
```

## 🎨 Cores do Projeto (para usar no Tailwind)

Adicione no `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#E84C1F',
        navy: '#1A2744',
      },
    },
  },
}
```

## ✅ Checklist de Responsividade

- [ ] Testar em mobile (< 640px)
- [ ] Testar em tablet (768px - 1024px)
- [ ] Testar em desktop (> 1024px)
- [ ] Menus funcionam em todas as telas
- [ ] Textos legíveis em mobile
- [ ] Botões clicáveis (min 44x44px)
- [ ] Imagens não quebram layout
- [ ] Scroll funciona corretamente
- [ ] Modais/drawers fecham no mobile

## 🚀 Dica de Ouro

Use o DevTools do Chrome:
1. F12 → Toggle Device Toolbar (Ctrl+Shift+M)
2. Teste em: iPhone SE, iPad, Desktop
3. Ajuste breakpoints conforme necessário
