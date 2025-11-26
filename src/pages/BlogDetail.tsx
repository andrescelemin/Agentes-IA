/**
 * Página de Detalle de Blog - SmartPrompt Solutions
 * Muestra un artículo completo del blog
 */
import { useParams, Link } from 'react-router'
import { Calendar, User, Clock, ArrowLeft, Share2, BookOpen } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import PageSEO from '../components/PageSEO'
import { getPostBySlug, blogPosts } from '../data/blog'

export default function BlogDetailPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : null

  if (!post) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Artículo no encontrado</h1>
          <p className="text-gray-600 mb-8">El artículo que buscas no existe o ha sido movido.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Blog
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Artículos relacionados (misma categoría o sector, excluyendo el actual)
  const relatedPosts = blogPosts
    .filter(p => p.slug !== post.slug && (p.category === post.category || p.sector === post.sector))
    .slice(0, 3)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error al compartir:', err)
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(window.location.href)
      alert('Enlace copiado al portapapeles')
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <PageSEO 
        title={`${post.title} - SmartPrompt Solutions`} 
        description={post.excerpt}
      />

      {/* Hero del Artículo */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 z-10" />
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="mx-auto max-w-4xl w-full px-6 pb-12">
            <Button asChild variant="outline" className="mb-6 bg-transparent text-white border-white hover:bg-white/10">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Blog
              </Link>
            </Button>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="inline-flex items-center rounded-full bg-blue-500/80 px-3 py-1 text-sm font-medium text-white">
                {post.category}
              </span>
              <span className="inline-flex items-center rounded-full bg-indigo-500/80 px-3 py-1 text-sm font-medium text-white">
                {post.sector}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} de lectura</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="bg-transparent text-white border-white hover:bg-white/10"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Compartir
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido del Artículo */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <div className="flex items-start gap-3">
                <BookOpen className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-blue-900 font-semibold mb-2">Resumen Ejecutivo</h3>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </div>

            {post.content.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-8 mb-6 text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          {/* CTA dentro del artículo */}
          <Card className="mt-12 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ¿Te gustaría implementar esto en tu empresa?
              </h3>
              <p className="text-gray-600 mb-6">
                Agenda una consulta gratuita y descubre cómo podemos adaptar estas soluciones a tu contexto específico.
              </p>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Link to="/contact">
                  Solicitar Consulta Gratuita
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Artículos Relacionados */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Artículos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.slug} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <Link to={`/blog/${relatedPost.slug}`}>
                    <div className="relative h-48">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                          {relatedPost.category}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800">
                          {relatedPost.sector}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{relatedPost.readTime}</span>
                        <span className="text-blue-600">Leer más →</span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navegación entre artículos */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="flex justify-between">
            <Button asChild variant="outline" className="bg-transparent">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Blog
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
              className="bg-transparent"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Compartir Artículo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}