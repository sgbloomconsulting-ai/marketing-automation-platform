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

  const renderSalesProcess = () => (
    <div className="space-y-6">
      <InfoBox>Understanding your sales process helps identify automation opportunities.</InfoBox>
      <textarea rows={6} placeholder="Describe your sales process..." className="w-full p-4 border-2 rounded-lg" value={responses.salesSteps || ''} onChange={(e) => updateResponse('salesSteps', e.target.value)} />
    </div>
  );

  const renderPipelineArchitecture = () => (
    <div className="space-y-6">
      <InfoBox>Design how you'll attract and nurture leads.</InfoBox>
      <div className="grid grid-cols-2 gap-3">
        {['Free Consultation', 'Ebook/Guide', 'Webinar'].map((m) => (
          <label key={m} className="flex items-center space-x-2 p-4 border-2 rounded-lg">
            <input type="checkbox" checked={(responses.leadMagnets || []).includes(m)} onChange={(e) => {
              const c = responses.leadMagnets || [];
              updateResponse('leadMagnets', e.target.checked ? [...c, m] : c.filter(x => x !== m));
            }} />
            <span>{m}</span>
          </label>
        ))}
      </div>
    </div>
  );

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