import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, Building, Users, Target, GitBranch, Zap, Palette, FileText, Mail, Settings, Download, Upload, Sparkles, ExternalLink, Info } from 'lucide-react';

const MarketingAutomationPlatform = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [currentPersona, setCurrentPersona] = useState(0);
  const [personas, setPersonas] = useState([{
    id: 1,
    name: 'Primary Persona',
    role: '',
    data: {}
  }]);
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [deploymentStep, setDeploymentStep] = useState(0);

  const steps = [
    { id: 'business', title: 'Business Discovery', icon: Building, subtitle: 'Tell us about your business' },
    { id: 'personas', title: 'Customer Personas', icon: Users, subtitle: 'Define your ideal customers' },
    { id: 'sales', title: 'Sales Process', icon: Target, subtitle: 'Map your customer journey' },
    { id: 'pipeline', title: 'Pipeline Architecture', icon: GitBranch, subtitle: 'Design your funnel' },
    { id: 'automation', title: 'Automation Mapping', icon: Zap, subtitle: 'Set up smart triggers' },
    { id: 'framework', title: 'Content Framework', icon: FileText, subtitle: 'Choose your messaging style' },
    { id: 'branding', title: 'Brand Identity', icon: Palette, subtitle: 'Define your brand look & feel' },
    { id: 'content', title: 'Content Generation', icon: FileText, subtitle: 'Generate AI-powered content' },
    { id: 'templates', title: 'Templates & Automation', icon: Mail, subtitle: 'Build your workflows' },
    { id: 'integration', title: 'GHL Integration', icon: Settings, subtitle: 'Deploy to Go High Level' }
  ];

  const updateResponse = (field, value) => {
    setResponses(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updatePersonaResponse = (field, value) => {
    setPersonas(prev => prev.map((persona, index) => 
      index === currentPersona 
        ? { ...persona, data: { ...persona.data, [field]: value } }
        : persona
    ));
  };

  const addNewPersona = () => {
    const newPersona = {
      id: personas.length + 1,
      name: `Persona ${personas.length + 1}`,
      role: '',
      data: {}
    };
    setPersonas(prev => [...prev, newPersona]);
    setCurrentPersona(personas.length);
  };

  const updatePersonaName = (name) => {
    setPersonas(prev => prev.map((persona, index) => 
      index === currentPersona 
        ? { ...persona, name }
        : persona
    ));
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGeneratedContent({
        landingPages: responses.landingPages?.length || 3,
        emailSequences: responses.emailSequences?.length || 5,
        socialPosts: 20,
        blogPosts: 4
      });
      setGenerating(false);
    }, 2000);
  };

  const handleDeploy = () => {
    setDeploymentStep(1);
    
    const steps = [1, 2, 3, 4, 5, 6];
    steps.forEach((step, index) => {
      setTimeout(() => {
        setDeploymentStep(step);
      }, (index + 1) * 1500);
    });
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    window.scrollTo(0, 0);
  };

  const InfoBox = ({ children }) => (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
      <div className="flex items-start">
        <Info className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-blue-900">{children}</p>
      </div>
    </div>
  );

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-4 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">{steps[currentStep].title}</h2>
            <p className="text-blue-100">{steps[currentStep].subtitle}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{currentStep + 1}</div>
            <div className="text-sm text-blue-100">of {steps.length}</div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-2 overflow-x-auto pb-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-14 h-14 rounded-full transition-all ${
                  index < currentStep 
                    ? 'bg-green-500 text-white shadow-lg' 
                    : index === currentStep 
                      ? 'bg-blue-500 text-white shadow-lg scale-110' 
                      : 'bg-gray-200 text-gray-400'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="w-7 h-7" />
                  ) : (
                    <Icon className="w-7 h-7" />
                  )}
                </div>
                <div className={`text-xs mt-2 text-center w-20 ${
                  index === currentStep ? 'font-bold text-blue-600' : 'text-gray-500'
                }`}>
                  {step.title.split(' ')[0]}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 w-8 mx-1 ${
                  index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderBusinessDiscovery = () => (
    <div className="space-y-6">
      <InfoBox>
        Let's start by understanding your business. This helps us create the perfect marketing strategy for you.
      </InfoBox>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Business Type</label>
            <select className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg" value={responses.businessType || ''} onChange={(e) => updateResponse('businessType', e.target.value)}>
              <option value="">Choose type</option>
              <option value="service">Service Business</option>
              <option value="product">Product Business</option>
              <option value="software">Software/SaaS</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Industry</label>
            <input type="text" placeholder="e.g., Healthcare" className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg" value={responses.industry || ''} onChange={(e) => updateResponse('industry', e.target.value)} />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-bold text-gray-700 mb-2">What makes you unique?</label>
          <textarea rows={4} placeholder="Tell us what makes your business special..." className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg" value={responses.uniqueValue || ''} onChange={(e) => updateResponse('uniqueValue', e.target.value)} />
        </div>
      </div>
    </div>
  );

  const renderCustomerPersonas = () => (
    <div className="space-y-6">
      <InfoBox>
        Create detailed profiles for each type of customer or decision maker.
      </InfoBox>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Your Customer Personas</h3>
          <button onClick={addNewPersona} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold">
            + Add Persona
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {personas.map((persona, index) => (
            <button key={persona.id} onClick={() => setCurrentPersona(index)} className={`px-6 py-3 rounded-lg font-bold ${
              currentPersona === index ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border-2'
            }`}>
              {persona.name}
            </button>
          ))}
        </div>

        <input type="text" placeholder="Persona Name" className="w-full p-4 border-2 rounded-lg mb-4" value={personas[currentPersona]?.name || ''} onChange={(e) => updatePersonaName(e.target.value)} />
        
        <textarea rows={4} placeholder="What's their biggest challenge?" className="w-full p-4 border-2 rounded-lg" value={personas[currentPersona]?.data.biggestChallenge || ''} onChange={(e) => updatePersonaResponse('biggestChallenge', e.target.value)} />
      </div>
    </div>
  );

  const renderSalesProcess = () => {
  const businessType = responses.businessType;
  
  // Business-type specific sales process questions
  const salesProcessConfig = {
    ecommerce: {
      leadSources: ['Social media ads', 'Google Shopping', 'Marketplace (Amazon/Etsy)', 'Instagram/TikTok', 'Email marketing', 'Influencer partnerships', 'SEO/Organic', 'Affiliate marketing'],
      keyMetrics: ['Cart abandonment rate', 'Average order value', 'Customer lifetime value', 'Return rate', 'Conversion rate by traffic source'],
      specificQuestion: {
        label: 'What\'s your biggest e-commerce challenge?',
        options: ['High cart abandonment', 'Low conversion rate', 'Customer retention', 'Product returns', 'Scaling ad spend', 'Inventory management']
      }
    },
    service: {
      leadSources: ['Referrals', 'Google Search/Maps', 'Local advertising', 'Website', 'Social media', 'Networking events', 'Partnerships', 'Yelp/Reviews'],
      keyMetrics: ['Booking rate', 'No-show rate', 'Average service value', 'Repeat customer rate', 'Lead response time'],
      specificQuestion: {
        label: 'What\'s your biggest service business challenge?',
        options: ['Scheduling conflicts', 'Last-minute cancellations', 'Inconsistent lead flow', 'Pricing objections', 'Competition', 'Service capacity']
      }
    },
    software: {
      leadSources: ['Product Hunt', 'Content marketing', 'Free trial signups', 'SaaS directories', 'LinkedIn', 'Paid ads', 'App stores', 'Partner integrations'],
      keyMetrics: ['Free trial to paid conversion', 'Monthly recurring revenue (MRR)', 'Churn rate', 'Customer acquisition cost', 'Time to value'],
      specificQuestion: {
        label: 'What\'s your biggest SaaS challenge?',
        options: ['Trial users not converting', 'High churn rate', 'Low product adoption', 'Long sales cycles', 'Feature requests overload', 'Pricing strategy']
      }
    },
    consulting: {
      leadSources: ['Referrals', 'Speaking engagements', 'LinkedIn outreach', 'Thought leadership content', 'Past clients', 'Industry events', 'Cold outreach', 'Partnerships'],
      keyMetrics: ['Proposal acceptance rate', 'Average project value', 'Pipeline value', 'Client retention', 'Referral rate'],
      specificQuestion: {
        label: 'What\'s your biggest consulting challenge?',
        options: ['Inconsistent pipeline', 'Long sales cycles', 'Scope creep', 'Pricing/positioning', 'Finding decision makers', 'Competing on price']
      }
    },
    coaching: {
      leadSources: ['Social media content', 'Webinars', 'Discovery calls', 'Podcast appearances', 'YouTube', 'Referrals', 'Speaking events', 'Book/Course'],
      keyMetrics: ['Discovery call to client conversion', 'Program completion rate', 'Client results/testimonials', 'Referral rate', 'Average client value'],
      specificQuestion: {
        label: 'What\'s your biggest coaching challenge?',
        options: ['Finding qualified leads', 'Pricing resistance', 'Client commitment/completion', 'Standing out from competition', 'Scaling beyond 1-on-1', 'Building authority']
      }
    },
    agency: {
      leadSources: ['Referrals', 'Case studies/Portfolio', 'Cold outreach', 'Partnerships', 'Content marketing', 'LinkedIn', 'Industry events', 'Retainer renewals'],
      keyMetrics: ['Client acquisition cost', 'Average retainer value', 'Client lifetime value', 'Proposal win rate', 'Client retention rate'],
      specificQuestion: {
        label: 'What\'s your biggest agency challenge?',
        options: ['Inconsistent lead flow', 'Scope creep', 'Client churn', 'Pricing/profitability', 'Team capacity', 'Differentiating from competitors']
      }
    }
  };

  const config = businessType && salesProcessConfig[businessType] ? salesProcessConfig[businessType] : null;

  return (
    <div className="space-y-6">
      <InfoBox>
        Understanding your current sales process helps us identify opportunities for automation and improvement.
      </InfoBox>

      <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-3">🛤️</span>
          Your Customer Journey
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Walk us through your sales process</label>
            <textarea 
              rows={6} 
              placeholder="Step 1: Lead discovers us through...
Step 2: They contact us by...
Step 3: We respond with...
Step 4: Then we...
Step 5: Finally..." 
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-orange-500" 
              value={responses.salesSteps || ''} 
              onChange={(e) => updateResponse('salesSteps', e.target.value)} 
            />
            <p className="text-xs text-gray-500 mt-1">💡 Break down each step from first contact to closed deal</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <label className="block text-sm font-bold text-gray-700 mb-2">📊 How many touchpoints before they buy?</label>
              <select 
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg" 
                value={responses.touchpoints || ''} 
                onChange={(e) => updateResponse('touchpoints', e.target.value)}
              >
                <option value="">Select...</option>
                <option value="1-3">1-3 touchpoints</option>
                <option value="4-6">4-6 touchpoints</option>
                <option value="7-10">7-10 touchpoints</option>
                <option value="11-15">11-15 touchpoints</option>
              </select>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <label className="block text-sm font-bold text-gray-700 mb-2">⏱️ Average time to close?</label>
              <select 
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg" 
                value={responses.actualSalesCycle || ''} 
                onChange={(e) => updateResponse('actualSalesCycle', e.target.value)}
              >
                <option value="">Select...</option>
                <option value="same-day">Same day</option>
                <option value="1-week">1 week</option>
                <option value="2-4-weeks">2-4 weeks</option>
                <option value="1-3-months">1-3 months</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {config && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 shadow-md">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {businessType.charAt(0).toUpperCase() + businessType.slice(1)}-Specific Sales Questions
              </h3>
              <p className="text-sm text-gray-600">Help us optimize your specific sales journey</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Where do your leads typically come from?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {config.leadSources.map((source) => (
                  <label key={source} className="flex items-center space-x-2 p-3 bg-white border-2 border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(responses.leadSources || []).includes(source)}
                      onChange={(e) => {
                        const current = responses.leadSources || [];
                        updateResponse(
                          'leadSources',
                          e.target.checked
                            ? [...current, source]
                            : current.filter(s => s !== source)
                        );
                      }}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm font-medium">{source}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {config.specificQuestion.label}
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {config.specificQuestion.options.map((option) => (
                  <label key={option} className="flex items-center space-x-2 p-3 bg-white border-2 border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(responses.salesChallenges || []).includes(option)}
                      onChange={(e) => {
                        const current = responses.salesChallenges || [];
                        updateResponse(
                          'salesChallenges',
                          e.target.checked
                            ? [...current, option]
                            : current.filter(c => c !== option)
                        );
                      }}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Which metrics do you track (or want to track)?
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {config.keyMetrics.map((metric) => (
                  <label key={metric} className="flex items-center space-x-2 p-3 bg-white border-2 border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(responses.trackingMetrics || []).includes(metric)}
                      onChange={(e) => {
                        const current = responses.trackingMetrics || [];
                        updateResponse(
                          'trackingMetrics',
                          e.target.checked
                            ? [...current, metric]
                            : current.filter(m => m !== metric)
                        );
                      }}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm font-medium">{metric}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-white rounded-lg border border-purple-200">
            <p className="text-sm text-gray-600">
              💡 <strong>Why we ask:</strong> These {businessType}-specific details help us recommend the right automation triggers and content that matches how your customers actually buy.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white border-2 border-red-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center">
          <span className="text-2xl mr-3">🚧</span>
          Current Bottlenecks
        </h3>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Where do you lose most prospects in your sales process?
          </label>
          <textarea 
            rows={3} 
            placeholder="e.g., After initial consultation, during pricing discussion, when sending proposals..." 
            className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-red-500" 
            value={responses.salesBottlenecks || ''} 
            onChange={(e) => updateResponse('salesBottlenecks', e.target.value)} 
          />
          <p className="text-xs text-gray-500 mt-1">💡 Identifying bottlenecks helps us create targeted nurture sequences</p>
        </div>
      </div>
    </div>
  );
};

  const renderPipelineArchitecture = () => {
  const businessType = responses.businessType;

  // Business-type specific pipeline configurations
  const pipelineConfig = {
    ecommerce: {
      icon: ShoppingCart,
      recommendedStages: [
        { name: 'Website Visitor', description: 'Browsing products, not yet engaged' },
        { name: 'Cart Added', description: 'Items in cart but not checked out' },
        { name: 'Checkout Started', description: 'Began checkout process' },
        { name: 'First Purchase', description: 'Completed first order' },
        { name: 'Repeat Customer', description: 'Made 2+ purchases' }
      ],
      leadMagnets: [
        { name: 'First purchase discount (10-15% off)', icon: '💰' },
        { name: 'Free shipping on first order', icon: '🚚' },
        { name: 'Product guide/lookbook', icon: '📖' },
        { name: 'Exclusive early access to sales', icon: '⭐' },
        { name: 'Loyalty program signup', icon: '🎁' }
      ],
      nurtureFocus: 'Cart recovery, product recommendations, loyalty building'
    },
    service: {
      icon: Wrench,
      recommendedStages: [
        { name: 'New Inquiry', description: 'Initial contact made' },
        { name: 'Consultation Scheduled', description: 'Booked discovery call/meeting' },
        { name: 'Quote Provided', description: 'Sent pricing and proposal' },
        { name: 'Booked', description: 'Service scheduled' },
        { name: 'Completed', description: 'Service delivered' }
      ],
      leadMagnets: [
        { name: 'Free consultation/assessment', icon: '💬' },
        { name: 'Service guide or checklist', icon: '✅' },
        { name: 'Before & after gallery', icon: '🖼️' },
        { name: 'Educational video series', icon: '🎥' },
        { name: 'First-time customer discount', icon: '🎟️' }
      ],
      nurtureFocus: 'Appointment reminders, service education, rebooking'
    },
    software: {
      icon: Code,
      recommendedStages: [
        { name: 'Free Trial', description: 'Activated trial account' },
        { name: 'Onboarding Started', description: 'Began setup process' },
        { name: 'Active User', description: 'Regularly using key features' },
        { name: 'Paid Customer', description: 'Converted to paid plan' },
        { name: 'Power User', description: 'High engagement, expansion potential' }
      ],
      leadMagnets: [
        { name: 'Free trial (7-14 days)', icon: '⚡' },
        { name: 'Product demo/walkthrough', icon: '🎬' },
        { name: 'Implementation guide', icon: '📘' },
        { name: 'Template library', icon: '📋' },
        { name: 'Webinar training series', icon: '🎓' }
      ],
      nurtureFocus: 'Feature adoption, trial extension, upgrade prompts'
    },
    consulting: {
      icon: Briefcase,
      recommendedStages: [
        { name: 'New Lead', description: 'Initial inquiry received' },
        { name: 'Discovery Call', description: 'Qualification call completed' },
        { name: 'Proposal Sent', description: 'Custom proposal delivered' },
        { name: 'Negotiation', description: 'Discussing terms and scope' },
        { name: 'Client Onboarded', description: 'Contract signed, project started' }
      ],
      leadMagnets: [
        { name: 'Free strategy session (30-60 min)', icon: '🎯' },
        { name: 'Industry report or research', icon: '📊' },
        { name: 'ROI calculator tool', icon: '🧮' },
        { name: 'Case study collection', icon: '📑' },
        { name: 'Implementation roadmap template', icon: '🗺️' }
      ],
      nurtureFocus: 'Authority building, proposal follow-up, scope clarification'
    },
    coaching: {
      icon: TrendingUp,
      recommendedStages: [
        { name: 'New Lead', description: 'Entered your world' },
        { name: 'Discovery Call Booked', description: 'Scheduled consultation' },
        { name: 'Discovery Completed', description: 'Had initial conversation' },
        { name: 'Enrolled', description: 'Joined program/coaching' },
        { name: 'Active Client', description: 'Progressing through program' }
      ],
      leadMagnets: [
        { name: 'Free discovery/breakthrough call', icon: '📞' },
        { name: 'Self-assessment or quiz', icon: '📝' },
        { name: 'Mini course or challenge', icon: '🎯' },
        { name: 'Transformation story guide', icon: '✨' },
        { name: 'Goal-setting workbook', icon: '📓' }
      ],
      nurtureFocus: 'Transformation stories, objection handling, commitment building'
    },
    agency: {
      icon: Store,
      recommendedStages: [
        { name: 'Marketing Qualified Lead', description: 'Showed interest, fits ICP' },
        { name: 'Sales Qualified', description: 'Budget and need confirmed' },
        { name: 'Proposal Stage', description: 'Custom proposal submitted' },
        { name: 'Negotiation', description: 'Finalizing scope and terms' },
        { name: 'Client Active', description: 'Contract signed, onboarded' }
      ],
      leadMagnets: [
        { name: 'Free marketing audit', icon: '🔍' },
        { name: 'Strategy session', icon: '💡' },
        { name: 'Industry benchmark report', icon: '📈' },
        { name: 'Case study portfolio', icon: '🏆' },
        { name: 'ROI projection tool', icon: '💰' }
      ],
      nurtureFocus: 'Expertise demonstration, competitive differentiation, results proof'
    }
  };

  const config = businessType && pipelineConfig[businessType] ? pipelineConfig[businessType] : null;

  return (
    <div className="space-y-6">
      <InfoBox>
        Let's design how you'll attract and nurture leads through your marketing funnel based on your {businessType || 'business'} model.
      </InfoBox>

      {config && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 shadow-md">
              <GitBranch className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Recommended Pipeline for {businessType.charAt(0).toUpperCase() + businessType.slice(1)}
              </h3>
              <p className="text-sm text-gray-600">Based on successful {businessType} businesses</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {config.recommendedStages.map((stage, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm mr-3">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{stage.name}</div>
                    <div className="text-sm text-gray-600">{stage.description}</div>
                  </div>
                  <button
                    onClick={() => {
                      const current = responses.selectedPipelineStages || [];
                      const isSelected = current.includes(stage.name);
                      updateResponse(
                        'selectedPipelineStages',
                        isSelected 
                          ? current.filter(s => s !== stage.name)
                          : [...current, stage.name]
                      );
                    }}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                      (responses.selectedPipelineStages || []).includes(stage.name)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-indigo-100'
                    }`}
                  >
                    {(responses.selectedPipelineStages || []).includes(stage.name) ? '✓ Added' : '+ Add'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-4 border border-indigo-200">
            <p className="text-sm text-gray-600">
              💡 <strong>Pro tip:</strong> {config.nurtureFocus}
            </p>
          </div>
        </div>
      )}

      <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-3">🎁</span>
          Lead Magnets & Offers
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {config 
            ? `Select the lead magnets that work best for ${businessType} businesses:` 
            : 'What will you offer to attract potential customers?'}
        </p>

        <div className="grid md:grid-cols-2 gap-3">
          {config ? (
            config.leadMagnets.map((magnet) => (
              <label key={magnet.name} className="flex items-center space-x-3 p-4 bg-gray-50 border-2 border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 cursor-pointer transition-all">
                <input 
                  type="checkbox" 
                  checked={(responses.leadMagnets || []).includes(magnet.name)} 
                  onChange={(e) => {
                    const c = responses.leadMagnets || [];
                    updateResponse('leadMagnets', e.target.checked ? [...c, magnet.name] : c.filter(x => x !== magnet.name));
                  }} 
                  className="w-5 h-5 rounded" 
                />
                <span className="text-2xl">{magnet.icon}</span>
                <span className="text-sm font-medium flex-1">{magnet.name}</span>
              </label>
            ))
          ) : (
            <>
              <label className="flex items-center space-x-3 p-4 bg-gray-50 border-2 border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 cursor-pointer transition-all">
                <input type="checkbox" className="w-5 h-5 rounded" />
                <span className="text-2xl">💬</span>
                <span className="text-sm font-medium">Free Consultation</span>
              </label>
              <label className="flex items-center space-x-3 p-4 bg-gray-50 border-2 border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 cursor-pointer transition-all">
                <input type="checkbox" className="w-5 h-5 rounded" />
                <span className="text-2xl">📘</span>
                <span className="text-sm font-medium">Ebook/Guide Download</span>
              </label>
            </>
          )}
        </div>
      </div>

      <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-3">📧</span>
          Email Nurture Strategy
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">How many emails in your sequence?</label>
            <select 
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg" 
              value={responses.emailSequenceLength || ''} 
              onChange={(e) => updateResponse('emailSequenceLength', e.target.value)}
            >
              <option value="">Choose...</option>
              <option value="3-5">3-5 emails (Quick)</option>
              <option value="6-8">6-8 emails (Balanced)</option>
              <option value="9-12">9-12 emails (Extended)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">How often should we send?</label>
            <select 
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg" 
              value={responses.emailFrequency || ''} 
              onChange={(e) => updateResponse('emailFrequency', e.target.value)}
            >
              <option value="">Choose...</option>
              <option value="daily">Every day</option>
              <option value="every-other">Every other day</option>
              <option value="twice-weekly">Twice per week</option>
              <option value="weekly">Once per week</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-green-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-3">🎯</span>
          Custom Pipeline Notes
        </h3>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Any specific stages or processes unique to your business?
          </label>
          <textarea 
            rows={4} 
            placeholder="Describe any custom stages, qualifications, or processes we should include..." 
            className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-green-500" 
            value={responses.customPipelineNotes || ''} 
            onChange={(e) => updateResponse('customPipelineNotes', e.target.value)} 
          />
        </div>
      </div>
    </div>
  );
};

  const renderAutomationMapping = () => (
    <div className="space-y-6">
      <InfoBox>Set up smart automation triggers.</InfoBox>
      <div className="grid grid-cols-2 gap-3">
        {['Form submission', 'Email opened', 'Link clicked'].map((t) => (
          <label key={t} className="flex items-center space-x-2 p-4 border-2 rounded-lg">
            <input type="checkbox" checked={(responses.automationTriggers || []).includes(t)} onChange={(e) => {
              const c = responses.automationTriggers || [];
              updateResponse('automationTriggers', e.target.checked ? [...c, t] : c.filter(x => x !== t));
            }} />
            <span>{t}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderContentFramework = () => (
    <div className="space-y-6">
      <InfoBox>Choose your messaging framework.</InfoBox>
      {['StoryBrand', 'Problem-Agitate-Solve', 'Big Idea'].map((f) => (
        <label key={f} className="flex items-center p-4 border-2 rounded-lg cursor-pointer">
          <input type="radio" name="framework" checked={responses.messagingFramework === f} onChange={() => updateResponse('messagingFramework', f)} className="mr-3" />
          <span className="font-medium">{f}</span>
        </label>
      ))}
    </div>
  );

  const renderBrandIdentity = () => (
    <div className="space-y-6">
      <InfoBox>Define your brand colors and message.</InfoBox>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-bold mb-2">Primary Color</label>
          <input type="color" className="w-full h-16 rounded border-2" value={responses.primaryColor || '#3B82F6'} onChange={(e) => updateResponse('primaryColor', e.target.value)} />
        </div>
        <div>
          <label className="block font-bold mb-2">Secondary Color</label>
          <input type="color" className="w-full h-16 rounded border-2" value={responses.secondaryColor || '#8B5CF6'} onChange={(e) => updateResponse('secondaryColor', e.target.value)} />
        </div>
      </div>
      <textarea rows={3} placeholder="Your positioning statement..." className="w-full p-4 border-2 rounded-lg" value={responses.positioningStatement || ''} onChange={(e) => updateResponse('positioningStatement', e.target.value)} />
    </div>
  );

  const renderContentGeneration = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-xl">
        <Sparkles className="w-10 h-10 mb-3" />
        <h3 className="text-2xl font-bold">AI Content Generation</h3>
      </div>

      {!generatedContent ? (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-10 text-center">
          <button onClick={handleGenerate} disabled={generating} className="px-10 py-5 bg-white text-purple-600 rounded-xl font-bold text-xl">
            {generating ? 'Generating...' : 'Generate All Content'}
          </button>
        </div>
      ) : (
        <div className="bg-green-50 border-4 border-green-300 rounded-xl p-10">
          <div className="text-center mb-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold">Content Generated!</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border-2">
              <div className="text-5xl font-bold text-green-600">{generatedContent.landingPages}</div>
              <div>Landing Pages</div>
            </div>
            <div className="bg-white rounded-xl p-6 border-2">
              <div className="text-5xl font-bold text-blue-600">{generatedContent.emailSequences}</div>
              <div>Email Sequences</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTemplatesAutomation = () => (
    <div className="space-y-6">
      <InfoBox>Select automation workflows to set up.</InfoBox>
      {['Welcome & Onboarding', 'Lead Nurture', 'Sales Conversion'].map((t) => (
        <label key={t} className="flex items-center p-4 border-2 rounded-lg">
          <input type="checkbox" className="mr-3" />
          <span className="font-medium">{t}</span>
        </label>
      ))}
    </div>
  );

  const renderGHLIntegration = () => {
    const deploymentSteps = [
      { id: 1, name: 'Creating funnels', icon: '📄' },
      { id: 2, name: 'Importing emails', icon: '📧' },
      { id: 3, name: 'Setting up automations', icon: '⚡' },
      { id: 4, name: 'Configuring triggers', icon: '🏷️' },
      { id: 5, name: 'Installing workflows', icon: '🔄' },
      { id: 6, name: 'Complete!', icon: '✅' }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-xl">
          <h3 className="text-2xl font-bold">Deploy to Go High Level</h3>
        </div>

        <div className="bg-white border-2 rounded-xl p-8">
          <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className={`w-5 h-5 rounded-full ${responses.ghlConnected ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className="font-bold">{responses.ghlConnected ? 'Connected' : 'Not Connected'}</span>
            </div>
            <button onClick={() => updateResponse('ghlConnected', !responses.ghlConnected)} className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold">
              {responses.ghlConnected ? 'Disconnect' : 'Connect GHL'}
            </button>
          </div>
        </div>

        {responses.ghlConnected && deploymentStep === 0 && (
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-12 text-center">
            <button onClick={handleDeploy} className="px-12 py-6 bg-white text-green-600 rounded-xl font-bold text-2xl">
              Deploy to GHL Now
            </button>
          </div>
        )}

        {deploymentStep > 0 && (
          <div className="bg-white border-4 border-green-300 rounded-xl p-10">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                {deploymentStep < 6 ? (
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
                ) : (
                  <CheckCircle className="w-16 h-16 text-white" />
                )}
              </div>
              <h3 className="text-4xl font-bold">{deploymentStep < 6 ? 'Deploying...' : 'Complete!'}</h3>
            </div>

            <div className="space-y-4">
              {deploymentSteps.map((step) => (
                <div key={step.id} className={`flex items-center justify-between p-6 rounded-xl border-2 ${
                  deploymentStep >= step.id ? 'bg-green-50 border-green-300' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{step.icon}</span>
                    <span className="font-bold">{step.name}</span>
                  </div>
                  {deploymentStep >= step.id && <CheckCircle className="w-8 h-8 text-green-600" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderBusinessDiscovery();
      case 1: return renderCustomerPersonas();
      case 2: return renderSalesProcess();
      case 3: return renderPipelineArchitecture();
      case 4: return renderAutomationMapping();
      case 5: return renderContentFramework();
      case 6: return renderBrandIdentity();
      case 7: return renderContentGeneration();
      case 8: return renderTemplatesAutomation();
      case 9: return renderGHLIntegration();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            AI Marketing Automation Platform
          </h1>
          <p className="text-xl text-gray-600">
            Build your complete marketing system in 10 easy steps
          </p>
        </div>

        {renderProgressBar()}
        
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-6 md:p-10 mb-8">
          {renderStepContent()}
          
          <div className="flex justify-between mt-10 pt-8 border-t-2 border-gray-200">
            <button onClick={prevStep} disabled={currentStep === 0} className="flex items-center px-8 py-4 text-gray-600 hover:text-gray-900 disabled:opacity-30 font-bold text-lg rounded-xl">
              <ChevronLeft className="w-6 h-6 mr-2" />
              Previous
            </button>
            
            <button onClick={nextStep} disabled={currentStep === steps.length - 1} className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-30 font-bold text-lg">
              Next Step
              <ChevronRight className="w-6 h-6 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingAutomationPlatform;
