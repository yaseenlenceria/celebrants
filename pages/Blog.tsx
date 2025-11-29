import React, { useState, useMemo } from 'react';
import { Search, Clock, BookOpen, Filter, X } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  imageUrl: string;
  author: string;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '10 SEO Tips for Celebrant Websites',
    excerpt: 'Boost your online visibility and attract more couples with these proven SEO strategies designed specifically for celebrant businesses.',
    category: 'SEO',
    readTime: 8,
    imageUrl: 'https://picsum.photos/seed/seo/600/400',
    author: 'Sarah Mitchell',
    date: '2024-03-15'
  },
  {
    id: 2,
    title: 'How to Write Compelling Wedding Ceremonies',
    excerpt: 'Master the art of creating meaningful, personalized ceremonies that couples will remember forever. Learn storytelling techniques and structure.',
    category: 'Tips',
    readTime: 12,
    imageUrl: 'https://picsum.photos/seed/ceremony/600/400',
    author: 'James Parker',
    date: '2024-03-12'
  },
  {
    id: 3,
    title: 'Marketing Your Celebrant Business on Social Media',
    excerpt: 'Discover which platforms work best for celebrants, what content to post, and how to convert followers into paying clients.',
    category: 'Marketing',
    readTime: 10,
    imageUrl: 'https://picsum.photos/seed/social/600/400',
    author: 'Emma Collins',
    date: '2024-03-10'
  },
  {
    id: 4,
    title: 'Setting Your Celebrant Service Prices',
    excerpt: 'Learn how to price your services competitively while ensuring your business remains profitable. Includes pricing frameworks and packages.',
    category: 'Business',
    readTime: 7,
    imageUrl: 'https://picsum.photos/seed/pricing/600/400',
    author: 'Michael Stevens',
    date: '2024-03-08'
  },
  {
    id: 5,
    title: 'Building a Professional Celebrant Portfolio',
    excerpt: 'Showcase your best work effectively. Tips for collecting testimonials, photographing ceremonies, and presenting your experience.',
    category: 'Business',
    readTime: 9,
    imageUrl: 'https://picsum.photos/seed/portfolio/600/400',
    author: 'Sarah Mitchell',
    date: '2024-03-05'
  },
  {
    id: 6,
    title: 'How to Handle Difficult Ceremony Situations',
    excerpt: 'Practical advice for managing unexpected challenges during ceremonies, from weather issues to family dynamics.',
    category: 'Tips',
    readTime: 11,
    imageUrl: 'https://picsum.photos/seed/difficult/600/400',
    author: 'James Parker',
    date: '2024-03-01'
  },
  {
    id: 7,
    title: 'Creating a Memorable First Meeting with Clients',
    excerpt: 'Make a lasting impression from day one. Learn what to cover in initial consultations and how to build rapport with couples.',
    category: 'Tips',
    readTime: 6,
    imageUrl: 'https://picsum.photos/seed/meeting/600/400',
    author: 'Emma Collins',
    date: '2024-02-28'
  },
  {
    id: 8,
    title: 'The Essential Celebrant Business Toolkit',
    excerpt: 'Must-have tools, software, and resources every professional celebrant needs to run their business efficiently in 2024.',
    category: 'Tools',
    readTime: 15,
    imageUrl: 'https://picsum.photos/seed/toolkit/600/400',
    author: 'Michael Stevens',
    date: '2024-02-25'
  }
];

const categories = ['All', 'Tips', 'Marketing', 'SEO', 'Business', 'Tools'];

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setShowFilters(false);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-champagne-700 to-champagne-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-champagne-800 bg-opacity-50 px-4 py-2 rounded-full mb-6">
              <BookOpen className="h-5 w-5 text-champagne-300" />
              <span className="text-sm font-medium text-champagne-200">Resources & Guides</span>
            </div>
            <h1 className="text-5xl font-extrabold font-serif mb-6">
              Resources for Celebrants
            </h1>
            <p className="text-xl text-champagne-100 max-w-3xl mx-auto">
              Expert tips, marketing strategies, and business advice to help you grow your celebrant practice and deliver unforgettable ceremonies.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-slate-50 border-b border-slate-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Category Filters - Desktop */}
            <div className="hidden md:flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-champagne-600 text-white shadow-md'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Category Filters - Mobile */}
            <div className="md:hidden w-full">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium"
              >
                <Filter className="h-5 w-5" />
                Filter by Category: {selectedCategory}
              </button>
              {showFilters && (
                <div className="mt-2 bg-white border border-slate-200 rounded-lg shadow-lg p-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium ${
                        selectedCategory === category
                          ? 'bg-champagne-50 text-champagne-700'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <p className="text-sm text-slate-500">
          Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No articles found</h3>
            <p className="text-slate-500">Try adjusting your search or filter to find what you're looking for.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 text-champagne-600 hover:text-champagne-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-white text-champagne-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                    <span>{post.author}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif group-hover:text-champagne-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 mb-4 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                    <button className="text-champagne-600 hover:text-champagne-700 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More
                      <span className="text-lg">→</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Coming Soon Notice */}
      {filteredPosts.length > 0 && (
        <div className="bg-slate-50 border-t border-slate-200 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <BookOpen className="h-12 w-12 text-champagne-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2 font-serif">Full Articles Coming Soon</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                We're currently working on publishing full-length, in-depth guides for celebrants.
                Subscribe to our newsletter to be notified when new articles are published.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                />
                <button className="bg-champagne-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-champagne-700 transition-colors">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
