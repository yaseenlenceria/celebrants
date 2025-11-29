import React, { useState } from 'react';
import {
  generateCeremonyScript,
  generateSocialPost,
  generateVows,
  generateContract,
  generateClientReview,
} from '../services/gemini';
import { PenTool, Heart, Instagram, FileText, Sparkles, Loader2, Copy, Star } from 'lucide-react';

type ToolType = 'script' | 'social' | 'vows' | 'contract' | 'review';

const Tools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('script');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string>('');

  // Script State
  const [partner1, setPartner1] = useState('');
  const [partner2, setPartner2] = useState('');
  const [tone, setTone] = useState('Romantic & Lighthearted');
  const [story, setStory] = useState('');

  // Social State
  const [socialTopic, setSocialTopic] = useState('');
  const [socialPlatform, setSocialPlatform] = useState('Instagram');
  const [socialVibe, setSocialVibe] = useState('Professional yet warm');

  // Vows State
  const [vowsPartnerName, setVowsPartnerName] = useState('');
  const [vowsPartnerForName, setVowsPartnerForName] = useState('');
  const [vowsStory, setVowsStory] = useState('');
  const [vowsTone, setVowsTone] = useState('Romantic');
  const [vowsLength, setVowsLength] = useState('Medium');

  // Contract State
  const [contractServiceType, setContractServiceType] = useState('Wedding Ceremony');
  const [contractCelebrantName, setContractCelebrantName] = useState('');
  const [contractClientName, setContractClientName] = useState('');
  const [contractServiceDate, setContractServiceDate] = useState('');
  const [contractServiceFee, setContractServiceFee] = useState('');
  const [contractDeposit, setContractDeposit] = useState('');
  const [contractSpecialTerms, setContractSpecialTerms] = useState('');

  // Review builder
  const [reviewCelebrantName, setReviewCelebrantName] = useState('');
  const [reviewCoupleNames, setReviewCoupleNames] = useState('');
  const [reviewVenue, setReviewVenue] = useState('');
  const [reviewHighlights, setReviewHighlights] = useState('');
  const [reviewTone, setReviewTone] = useState('Warm & professional');

  const handleScriptGen = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput('');
    const result = await generateCeremonyScript(partner1, partner2, tone, story);
    setOutput(result.text || result.error || 'Error');
    setLoading(false);
  };

  const handleSocialGen = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput('');
    const result = await generateSocialPost(socialTopic, socialPlatform, socialVibe);
    setOutput(result.text || result.error || 'Error');
    setLoading(false);
  };

  const handleVowsGen = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput('');
    const result = await generateVows(vowsPartnerName, vowsPartnerForName, vowsStory, vowsTone, vowsLength);
    setOutput(result.text || result.error || 'Error');
    setLoading(false);
  };

  const handleContractGen = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput('');
    const result = await generateContract(
      contractServiceType,
      contractCelebrantName,
      contractClientName,
      contractServiceDate,
      contractServiceFee,
      contractDeposit,
      contractSpecialTerms
    );
    setOutput(result.text || result.error || 'Error');
    setLoading(false);
  };

  const handleReviewGen = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput('');
    const result = await generateClientReview(
      reviewCelebrantName,
      reviewCoupleNames,
      reviewVenue,
      reviewHighlights,
      reviewTone
    );
    setOutput(result.text || result.error || 'Error');
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert('Copied to clipboard!');
  };

  return (
    <div className="bg-cream-100 min-h-screen text-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-cream-200 rounded-xl shadow-sm border border-sage-100 overflow-hidden sticky top-24">
              <div className="p-4 bg-cream-200 text-charcoal-800">
                <h2 className="font-bold font-serif flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-champagne-500" /> AI Toolkit
                </h2>
              </div>
              <nav className="p-2 flex flex-col gap-1">
                <button
                  onClick={() => setActiveTool('script')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTool === 'script' ? 'bg-champagne-500/15 text-champagne-200' : 'text-charcoal-600 hover:bg-cream-200'
                  }`}
                >
                  <PenTool className="w-4 h-4 mr-3" /> Ceremony Script
                </button>
                <button
                  onClick={() => setActiveTool('social')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTool === 'social' ? 'bg-champagne-500/15 text-champagne-200' : 'text-charcoal-600 hover:bg-cream-200'
                  }`}
                >
                  <Instagram className="w-4 h-4 mr-3" /> Social Media Post
                </button>
                <button
                  onClick={() => setActiveTool('vows')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTool === 'vows' ? 'bg-champagne-500/15 text-champagne-200' : 'text-charcoal-600 hover:bg-cream-200'
                  }`}
                >
                  <Heart className="w-4 h-4 mr-3" /> Vows Generator
                </button>
                <button
                  onClick={() => setActiveTool('contract')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTool === 'contract' ? 'bg-champagne-500/15 text-champagne-200' : 'text-charcoal-600 hover:bg-cream-200'
                  }`}
                >
                  <FileText className="w-4 h-4 mr-3" /> Contract Builder
                </button>
                <button
                  onClick={() => setActiveTool('review')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTool === 'review' ? 'bg-champagne-500/15 text-champagne-200' : 'text-charcoal-600 hover:bg-cream-200'
                  }`}
                >
                  <Star className="w-4 h-4 mr-3" /> Review Builder
                </button>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="bg-cream-200 rounded-xl shadow-sm border border-sage-100 min-h-[600px] overflow-hidden">
              <div className="border-b border-white/5 p-6 bg-cream-200">
                <h2 className="text-2xl font-serif font-bold text-charcoal-800">
                  {activeTool === 'script'
                    ? 'Ceremony Script Generator'
                    : activeTool === 'social'
                    ? 'Social Media Assistant'
                    : activeTool === 'vows'
                    ? 'Vows Generator'
                    : activeTool === 'contract'
                    ? 'Contract Builder'
                    : 'Client Review Builder'}
                </h2>
                <p className="text-charcoal-600 text-sm mt-1">
                  {activeTool === 'script'
                    ? 'Generate a customized, full-length wedding ceremony script in seconds.'
                    : activeTool === 'social'
                    ? 'Create engaging captions for Instagram, Facebook, or LinkedIn.'
                    : activeTool === 'vows'
                    ? 'Craft personalized, heartfelt wedding vows that capture your unique love story.'
                    : activeTool === 'contract'
                    ? 'Create professional service contracts for weddings, funerals, and other ceremonies.'
                    : 'Write polished reviews you can share on your site, Google, or the directory.'}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 h-full divide-y lg:divide-y-0 lg:divide-x divide-white/5">
                <div className="p-6 bg-cream-100/40">
                  {activeTool === 'script' && (
                    <form onSubmit={handleScriptGen} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal-700">Partner 1</label>
                          <input
                            type="text"
                            value={partner1}
                            onChange={(e) => setPartner1(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                            placeholder="e.g. James"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal-700">Partner 2</label>
                          <input
                            type="text"
                            value={partner2}
                            onChange={(e) => setPartner2(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                            placeholder="e.g. Sarah"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700">Tone</label>
                        <select
                          value={tone}
                          onChange={(e) => setTone(e.target.value)}
                          className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                        >
                          <option>Romantic & Lighthearted</option>
                          <option>Modern & Minimal</option>
                          <option>Playful & Fun</option>
                          <option>Formal & Elegant</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700">Story Highlights</label>
                        <textarea
                          value={story}
                          onChange={(e) => setStory(e.target.value)}
                          rows={4}
                          className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                          placeholder="How you met, shared adventures, what makes you two unique"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-ink-900 bg-champagne-500 hover:bg-champagne-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" /> Generating...
                          </>
                        ) : (
                          'Generate Script'
                        )}
                      </button>
                    </form>
                  )}

                  {activeTool === 'social' && (
                    <form onSubmit={handleSocialGen} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700">Topic</label>
                        <input
                          type="text"
                          value={socialTopic}
                          onChange={(e) => setSocialTopic(e.target.value)}
                          required
                          className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                          placeholder="Elopement in the Peaks, family weddings, etc"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal-700">Platform</label>
                          <select
                            value={socialPlatform}
                            onChange={(e) => setSocialPlatform(e.target.value)}
                            className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                          >
                            <option>Instagram</option>
                            <option>Facebook</option>
                            <option>LinkedIn</option>
                            <option>Threads</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal-700">Vibe</label>
                          <select
                            value={socialVibe}
                            onChange={(e) => setSocialVibe(e.target.value)}
                            className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                          >
                            <option>Professional yet warm</option>
                            <option>Bold & punchy</option>
                            <option>Romantic storyteller</option>
                            <option>Playful & approachable</option>
                          </select>
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-ink-900 bg-champagne-500 hover:bg-champagne-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" /> Generating...
                          </>
                        ) : (
                          'Generate Post'
                        )}
                      </button>
                    </form>
                  )}

                  {activeTool === 'vows' && (
                    <form onSubmit={handleVowsGen} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal-700">Partner Name</label>
                          <input
                            type="text"
                            value={vowsPartnerName}
                            onChange={(e) => setVowsPartnerName(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                            placeholder="You"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal-700">Partner For</label>
                          <input
                            type="text"
                            value={vowsPartnerForName}
                            onChange={(e) => setVowsPartnerForName(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                            placeholder="Your partner"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700">Your Story</label>
                        <textarea
                          value={vowsStory}
                          onChange={(e) => setVowsStory(e.target.value)}
                          rows={4}
                          className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                          placeholder="How you met, favourite memories, what you promise"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal-700">Tone</label>
                          <select
                            value={vowsTone}
                            onChange={(e) => setVowsTone(e.target.value)}
                            className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                          >
                            <option>Romantic</option>
                            <option>Playful</option>
                            <option>Formal</option>
                            <option>Minimalist</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal-700">Length</label>
                          <select
                            value={vowsLength}
                            onChange={(e) => setVowsLength(e.target.value)}
                            className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                          >
                            <option>Short</option>
                            <option>Medium</option>
                            <option>Long</option>
                          </select>
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-ink-900 bg-champagne-500 hover:bg-champagne-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" /> Generating...
                          </>
                        ) : (
                          'Generate Vows'
                        )}
                      </button>
                    </form>
                  )}

                  {activeTool === 'contract' && (
                    <form onSubmit={handleContractGen} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700">Service Type</label>
                        <select
                          value={contractServiceType}
                          onChange={(e) => setContractServiceType(e.target.value)}
                          className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                        >
                          <option>Wedding Ceremony</option>
                          <option>Funeral / Celebration of Life</option>
                          <option>Baby Naming</option>
                          <option>Vow Renewal</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal-700">Celebrant Name</label>
                          <input
                            type="text"
                            value={contractCelebrantName}
                            onChange={(e) => setContractCelebrantName(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal-700">Client Name(s)</label>
                          <input
                            type="text"
                            value={contractClientName}
                            onChange={(e) => setContractClientName(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                            placeholder="Client full name(s)"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700">Service Date</label>
                        <input
                          type="date"
                          value={contractServiceDate}
                          onChange={(e) => setContractServiceDate(e.target.value)}
                          required
                          className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal-700">Service Fee (�)</label>
                          <input
                            type="number"
                            value={contractServiceFee}
                            onChange={(e) => setContractServiceFee(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                            placeholder="500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal-700">Deposit Amount (�)</label>
                          <input
                            type="number"
                            value={contractDeposit}
                            onChange={(e) => setContractDeposit(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                            placeholder="100"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700">Special Terms / Conditions</label>
                        <textarea
                          value={contractSpecialTerms}
                          onChange={(e) => setContractSpecialTerms(e.target.value)}
                          rows={4}
                          className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                          placeholder="Any special requirements, additional services, or custom terms for this contract..."
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-ink-900 bg-champagne-500 hover:bg-champagne-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" /> Generating...
                          </>
                        ) : (
                          'Generate Contract'
                        )}
                      </button>
                    </form>
                  )}

                  {activeTool === 'review' && (
                    <form onSubmit={handleReviewGen} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700">Celebrant Name</label>
                        <input
                          type="text"
                          value={reviewCelebrantName}
                          onChange={(e) => setReviewCelebrantName(e.target.value)}
                          required
                          className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-charcoal-700">Couple Names</label>
                          <input
                            type="text"
                            value={reviewCoupleNames}
                            onChange={(e) => setReviewCoupleNames(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                            placeholder="e.g. Hannah & Lewis"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-charcoal-700">Venue or City</label>
                          <input
                            type="text"
                            value={reviewVenue}
                            onChange={(e) => setReviewVenue(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                            placeholder="e.g. Dublin City Hall"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700">Highlights to mention</label>
                        <textarea
                          value={reviewHighlights}
                          onChange={(e) => setReviewHighlights(e.target.value)}
                          rows={4}
                          className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                          placeholder="Bilingual blessing, custom vows, calm hosting, music cues, etc"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-700">Tone</label>
                        <select
                          value={reviewTone}
                          onChange={(e) => setReviewTone(e.target.value)}
                          className="mt-1 block w-full rounded-md border-sage-100 bg-champagne-light shadow-sm focus:border-accent-400 focus:ring-accent-400 sm:text-sm p-2 text-charcoal-800"
                        >
                          <option>Warm & professional</option>
                          <option>Energetic & fun</option>
                          <option>Elegant & formal</option>
                          <option>Short & punchy</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-ink-900 bg-champagne-500 hover:bg-champagne-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" /> Generating...
                          </>
                        ) : (
                          'Generate Review'
                        )}
                      </button>
                    </form>
                  )}
                </div>

                {/* Output Section */}
                <div className="p-6 relative bg-cream-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium text-charcoal-600 uppercase tracking-wider">AI Output</h3>
                    {output && (
                      <button onClick={copyToClipboard} className="text-champagne-200 hover:text-champagne-100 text-sm flex items-center">
                        <Copy className="w-4 h-4 mr-1" /> Copy
                      </button>
                    )}
                  </div>

                  <div className="bg-cream-100/60 border border-sage-100 rounded-lg p-4 h-[520px] overflow-y-auto whitespace-pre-wrap font-sans text-sm text-charcoal-800 leading-relaxed">
                    {loading ? (
                      <div className="h-full flex flex-col items-center justify-center text-charcoal-600">
                        <Sparkles className="w-8 h-8 mb-2 animate-pulse text-champagne-400" />
                        <p>Consulting the creative muse...</p>
                      </div>
                    ) : output ? (
                      output
                    ) : (
                      <div className="h-full flex items-center justify-center text-charcoal-500 text-center px-8">
                        <p>Fill in the details on the left and hit generate to see your results here.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
