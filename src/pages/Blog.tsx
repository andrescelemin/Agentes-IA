/**
 * Página del Blog - SmartPrompt Solutions
 * Muestra artículos destacados y lista de posts con filtros
 */
import { useState } from 'react'
import { Link } from 'react-router'
import { Search, Calendar, User, Clock, ArrowRight, Star } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import PageSEO from '../components/PageSEO'
import { featuredPost, blogPosts, categories, sectors, type BlogPost } from '../data/blog'

export default function BlogPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedSector, setSelectedSector] = useState('Todos')

  // Filtrar posts
  const filteredPosts = blogPosts.filter((post: BlogPost) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory
    const matchesSector = selectedSector === 'Todos' || post.sector === selectedSector
    
    return matchesSearch && matchesCategory && matchesSector
  })

  return (
    <div className="bg-white min-h-screen">
      <PageSEO 
        title="Blog - SmartPrompt Solutions" 
        description="Descubre casos de éxito, técnicas avanzadas y metodologías para implementar GPTs personalizados en tu empresa."
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Blog SmartPrompt
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Casos de éxito reales, técnicas avanzadas y metodologías probadas para transformar tu negocio con IA personalizada.
            </p>
          </div>
        </div>
      </section>

      {/* Artículo Destacado */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Artículo Destacado</h2>
            <div className="flex items-center gap-2 text-amber-600">
              <Star className="h-5 w-5 fill-amber-400" />
              <span className="font-medium">Destacado</span>
            </div>
          </div>

          <Card className="overflow-hidden border-blue-200 hover:shadow-xl transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-80 lg:h-full">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    {featuredPost.category}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800">
                    {featuredPost.sector}
                  </span>
                </div>
                
                <CardTitle className="text-2xl lg:text-3xl mb-4">
                  {featuredPost.title}
                </CardTitle>
                
                <CardDescription className="text-lg text-gray-600 mb-6">
                  {featuredPost.excerpt}
                </CardDescription>

                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime} de lectura</span>
                  </div>
                </div>

                <Button asChild className="w-fit bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Link to={`/blog/${featuredPost.slug}`}>
                    Leer Artículo Completo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Filtros y Búsqueda */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-12">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-64">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-full lg:w-64">
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Grid de Artículos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.slug} className="hover:shadow-lg transition-shadow overflow-hidden">
                <Link to={`/blog/${post.slug}`}>
                  <div className="relative h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                    {post.featured && (
                      <div className="absolute top-3 left-3">
                        <div className="flex items-center gap-1 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          <Star className="h-3 w-3 fill-white" />
                          Destacado
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                        {post.category}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800">
                        {post.sector}
                      </span>
                    </div>

                    <CardTitle className="text-lg mb-3 line-clamp-2">
                      {post.title}
                    </CardTitle>

                    <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-blue-600">
                        <span>Leer más</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No se encontraron artículos que coincidan con los filtros.</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('Todos')
                  setSelectedSector('Todos')
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ¿Listo para tu propio caso de éxito?
          </h2>
          <p className="mt-6 text-lg leading-8 text-blue-100">
            Agenda una consulta gratuita y descubre cómo podemos transformar tus procesos con IA personalizada.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-50">
              <Link to="/contact">
                Solicitar Consulta Gratuita
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
