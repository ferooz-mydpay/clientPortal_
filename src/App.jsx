import React, { useState, useEffect } from 'react';
import { translations } from './i18n/translations';
import { TopBanner } from './components/layout/TopBanner';
import { Navbar } from './components/layout/Navbar';
import { WelcomeBanner } from './components/home/WelcomeBanner';
import { StatCards } from './components/home/StatCards';
import { RecentTimesheets } from './components/home/RecentTimesheets';
import { RightSidebar } from './components/layout/RightSidebar';
import { CompanyDocuments } from './components/home/CompanyDocuments';
import { TimesheetsPage } from './pages/TimesheetsPage';
import { TimesheetDetailView } from './pages/TimesheetDetailView';
import { TimesheetReviewPage } from './pages/TimesheetReviewPage';
import { RequestsPage } from './pages/RequestsPage';
import { ProjectChatPage } from './pages/ProjectChatPage';
import { NewRequestModal } from './components/modals/NewRequestModal';
import { ViewRequestModal } from './components/modals/ViewRequestModal';
import { Footer } from './components/layout/Footer';
import { DocumentModal } from './components/modals/DocumentModal';
import { SearchModal } from './components/modals/SearchModal';
import { ProfilePage } from './pages/ProfilePage';
import { SignInPage } from './pages/SignInPage';
import { EmployeesPage } from './pages/EmployeesPage';
import { CheckCircle2 } from 'lucide-react';

// Project data store – all projects the user belongs to
const ALL_PROJECTS = [
  {
    id: 'p1',
    companyName: 'National Marketing Company Ltd.',
    companyNameAr: 'الشركة الوطنية للتسويق المحدودة',
    contractCode: 'JE-B-0098',
    employees: 1,
    timesheets: [
      { id: 'ts-dec-2026', title: 'December 2026', code: 'JE-B-0098-2026-12', period: '01/12/2026 – 31/12/2026', statusKey: 'approved' },
      { id: 'ts-nov-2026', title: 'November 2026', code: 'JE-B-0098-2026-11', period: '01/11/2026 – 30/11/2026', statusKey: 'approved' },
      { id: 'ts-oct-2026', title: 'October 2026', code: 'JE-B-0098-2026-10', period: '01/10/2026 – 31/10/2026', statusKey: 'sentBack' },
      { id: 'ts-may-2026', title: 'May 2026',      code: 'JE-B-0098-2026-05', period: '01/05/2026 – 31/05/2026', statusKey: 'awaiting' },
      { id: 'ts-mar-2026', title: 'March 2026',    code: 'JE-B-0098-2026-03', period: '01/03/2026 – 31/03/2026', statusKey: 'sentBack' },
    ],
    stats: { approved: 2, awaiting: 1, inProgress: 2 },
  },
  {
    id: 'p2',
    companyName: 'Gulf Construction Corp.',
    companyNameAr: 'شركة الخليج للإنشاءات',
    contractCode: 'JE-B-0112',
    employees: 3,
    timesheets: [
      { id: 'ts-dec-2026-p2', title: 'December 2026', code: 'JE-B-0112-2026-12', period: '01/12/2026 – 31/12/2026', statusKey: 'awaiting' },
      { id: 'ts-nov-2026-p2', title: 'November 2026', code: 'JE-B-0112-2026-11', period: '01/11/2026 – 30/11/2026', statusKey: 'sentBack' },
      { id: 'ts-oct-2026-p2', title: 'October 2026', code: 'JE-B-0112-2026-10', period: '01/10/2026 – 31/10/2026', statusKey: 'approved' },
    ],
    stats: { approved: 1, awaiting: 1, inProgress: 1 },
  },
  {
    id: 'p3',
    companyName: 'Riyadh Facilities Management Co.',
    companyNameAr: 'شركة إدارة المرافق الرياض',
    contractCode: 'JE-B-0127',
    employees: 5,
    timesheets: [
      { id: 'ts-dec-2026-p3', title: 'December 2026', code: 'JE-B-0127-2026-12', period: '01/12/2026 – 31/12/2026', statusKey: 'sentBack' },
      { id: 'ts-nov-2026-p3', title: 'November 2026', code: 'JE-B-0127-2026-11', period: '01/11/2026 – 30/11/2026', statusKey: 'approved' },
    ],
    stats: { approved: 1, awaiting: 0, inProgress: 1 },
  },
];

export default function App() {
  const [language, setLanguage] = useState('en'); // 'en' or 'ar'
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Sign in screen comes first
  const [activeTab, setActiveTab] = useState('home');
  const [toastMessage, setToastMessage] = useState(null);

  // Active project – drives all data across timesheets, home, sidebar, etc.
  const [activeProjectId, setActiveProjectId] = useState('p1');
  const activeProject = ALL_PROJECTS.find(p => p.id === activeProjectId) || ALL_PROJECTS[0];

  // Timesheet Detail Full-Page View state
  const [detailedTimesheet, setDetailedTimesheet] = useState(null);

  // Timesheet Review Full-Page View state matching Screenshots
  const [reviewingTimesheet, setReviewingTimesheet] = useState(null);

  // Modals state
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [docModalMode, setDocModalMode] = useState('view');
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Requests state
  const [newRequestModalOpen, setNewRequestModalOpen] = useState(false);
  const [viewRequestModalOpen, setViewRequestModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Chat Messages state
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'test Portal',
      senderType: 'user',
      text: 'شاكرين لكم',
      timestamp: '12/11/2026, 12:58',
    },
    {
      id: 2,
      sender: 'Ali Gadalla',
      senderType: 'supervisor',
      text: 'بشرفنا خدمتكم',
      timestamp: '12/11/2026, 12:58',
    },
    {
      id: 3,
      sender: 'test Portal',
      senderType: 'user',
      text: 'hello',
      timestamp: '15/11/2026, 19:38',
    },
    {
      id: 4,
      sender: 'Ali Gadalla',
      senderType: 'supervisor',
      text: 'hi Ali',
      timestamp: '15/11/2026, 19:39',
    },
    {
      id: 5,
      sender: 'test Portal',
      senderType: 'user',
      text: 'hello',
      timestamp: '16/11/2026, 17:33',
    },
  ]);

  // Sync RTL / LTR on html root
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Sync timesheets whenever the active project changes
  useEffect(() => {
    setTimesheets(activeProject.timesheets);
    setDetailedTimesheet(null);
    setReviewingTimesheet(null);
  }, [activeProjectId]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const t = translations[language];

  // Timesheets Data — driven by active project
  const [timesheets, setTimesheets] = useState(activeProject.timesheets);

  // Documents Data
  const [documents, setDocuments] = useState([
    {
      id: 'doc-cr',
      title: language === 'ar' ? 'السجل التجاري' : 'Commercial Registration',
      filename: 'GOSI-_EM.pdf',
      statusKey: 'pending',
    },
    {
      id: 'doc-address',
      title: language === 'ar' ? 'العنوان الوطني' : 'National Address',
      filename: 'National_address_New.pdf',
      statusKey: 'valid',
    },
    {
      id: 'doc-vat',
      title: language === 'ar' ? 'شهادة ضريبة القيمة المضافة' : 'VAT Certificate',
      filename: 'VAT_registration_certificate_of_JE_-_New.pdf',
      expiryDate: '21/01/2027',
      statusKey: 'pending',
    },
    {
      id: 'doc-contract',
      title: language === 'ar' ? 'نسخة العقد الموقعة' : 'Signed Contract Copy',
      filename: 'GOSI_Certificate.pdf',
      statusKey: 'pending',
    },
  ]);

  // Requests Data matching screenshots
  const [requests, setRequests] = useState([
    {
      id: 'REQ-00034',
      type: 'Refused Case',
      status: 'New',
      requestedOn: '17/11/2026',
      expectedBy: '20/11/2026',
      details: 'not working',
      workersList: [
        {
          name: 'احمد عبد الباقي محمد',
          idIqama: '2352715144',
          personnelNo: '1018573',
          nationality: 'مصر',
          profession: 'مبرمج حاسب آلي',
        },
      ],
      history: [
        {
          timestamp: '17/11/2026, 14:25',
          actor: 'You',
          stage: 'New',
          message: 'Request submitted.',
        },
      ],
    },
    {
      id: 'REQ-00033',
      type: 'Vacation',
      status: 'Completed',
      requestedOn: '11/11/2026',
      expectedBy: '14/11/2026',
      startDate: '15/11/2026',
      endDate: '26/11/2026',
      details: 'وقاى',
      workersList: [
        {
          name: 'احمد عبد الباقي محمد',
          idIqama: '2352715144',
          personnelNo: '1018573',
          nationality: 'مصر',
          profession: 'مبرمج حاسب آلي',
        },
      ],
      history: [
        {
          timestamp: '11/11/2026, 19:53',
          actor: 'You',
          stage: 'New',
          message: 'Request submitted.',
        },
        {
          timestamp: '11/11/2026, 19:53',
          actor: 'Jussur',
          stage: 'In Progress',
          message: 'Your request is now in progress.',
        },
        {
          timestamp: '11/11/2026, 19:59',
          actor: 'Jussur',
          stage: 'Completed',
          message: 'Your request has been completed.',
        },
      ],
    },
    {
      id: 'REQ-00032',
      type: 'New Demand',
      status: 'Completed',
      requestedOn: '11/11/2026',
      expectedBy: '14/11/2026',
      details: 'Standard hiring request for 1 specialized developer',
      workersList: [
        {
          name: 'احمد عبد الباقي محمد',
          idIqama: '2352715144',
          personnelNo: '1018573',
          nationality: 'مصر',
          profession: 'مبرمج حاسب آلي',
        },
      ],
      history: [
        {
          timestamp: '11/11/2026, 10:15',
          actor: 'You',
          stage: 'New',
          message: 'Request submitted.',
        },
        {
          timestamp: '11/11/2026, 11:30',
          actor: 'Jussur',
          stage: 'Completed',
          message: 'Your request has been completed.',
        },
      ],
    },
  ]);

  // Keep document titles synced when language changes
  useEffect(() => {
    setDocuments((prev) => [
      { ...prev[0], title: language === 'ar' ? 'السجل التجاري' : 'Commercial Registration' },
      { ...prev[1], title: language === 'ar' ? 'العنوان الوطني' : 'National Address' },
      { ...prev[2], title: language === 'ar' ? 'شهادة ضريبة القيمة المضافة' : 'VAT Certificate' },
      { ...prev[3], title: language === 'ar' ? 'نسخة العقد الموقعة' : 'Signed Contract Copy' },
    ]);
  }, [language]);

  // Action Handlers
  const handleReviewTimesheet = (ts) => {
    setReviewingTimesheet(ts);
    setDetailedTimesheet(null);
    setActiveTab('timesheets');
  };

  const handleViewTimesheet = (ts) => {
    setDetailedTimesheet(ts);
    setReviewingTimesheet(null);
    setActiveTab('timesheets');
  };

  const handleApproveTimesheet = (id) => {
    setTimesheets((prev) =>
      prev.map((item) => (item.id === id ? { ...item, statusKey: 'approved' } : item))
    );
    setReviewingTimesheet(null);
    showToast(t.notificationSuccessApproval);
  };

  const handleUploadEditedVersion = (tsCode, reason) => {
    showToast(`Edited version for ${tsCode} uploaded and sent for review!`);
    setReviewingTimesheet(null);
  };

  const handleViewDoc = (doc) => {
    setSelectedDoc(doc);
    setDocModalMode('view');
    setDocModalOpen(true);
  };

  const handleDownloadDoc = (doc) => {
    showToast(`Downloading ${doc.filename}...`);
  };

  const handleUpdateDoc = (doc) => {
    setSelectedDoc(doc);
    setDocModalMode('update');
    setDocModalOpen(true);
  };

  const handleUploadSuccess = (docId, newFilename) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId ? { ...doc, filename: newFilename, statusKey: 'pending' } : doc
      )
    );
    showToast(`File ${newFilename} uploaded successfully!`);
  };

  const handleSubmitDocForRequest = (doc, newFilename, expiryDate) => {
    // 1. Update document status
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === doc.id ? { ...d, filename: newFilename, statusKey: 'pending', expiryDate: expiryDate || d.expiryDate } : d
      )
    );

    // 2. Generate a new request in Requests
    const newReqId = `REQ-000${requests.length + 35}`;
    const newRequest = {
      id: newReqId,
      type: 'Iqama',
      status: 'New',
      requestedOn: '18/11/2026',
      expectedBy: '21/11/2026',
      details: `Document renewal and update submitted for ${doc.title} (${newFilename}). Expiry date: ${expiryDate || 'N/A'}.`,
      workers: [
        {
          name: 'احمد عبد الباقي محمد',
          id: '2352715144',
          personnelNo: '1018573',
          nationality: 'مصر',
          profession: 'مبرمج حاسب آلي',
        },
      ],
      history: [
        {
          date: '18/11/2026, 19:15',
          author: 'You',
          action: 'New',
          comment: `Document request submitted for ${doc.title}.`,
        },
      ],
    };

    setRequests((prev) => [newRequest, ...prev]);
    showToast(language === 'ar' ? `تم تقديم الطلب بنجاح برقم ${newReqId}` : `Document submitted for request (${newReqId})!`);
  };

  // Requests Handlers
  const handleCreateNewRequest = (newReq) => {
    setRequests((prev) => [newReq, ...prev]);
    showToast(`Request ${newReq.id} submitted successfully!`);
  };

  const handleViewRequest = (req) => {
    setSelectedRequest(req);
    setViewRequestModalOpen(true);
  };

  const handleAddCommentToRequest = (reqId, newEvent) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? { ...r, history: [...(r.history || []), newEvent] }
          : r
      )
    );
    setSelectedRequest((prev) =>
      prev && prev.id === reqId
        ? { ...prev, history: [...(prev.history || []), newEvent] }
        : prev
    );
    showToast('Comment sent successfully!');
  };

  // Chat Handlers
  const handleSendMessage = (newMsg) => {
    setChatMessages((prev) => [...prev, newMsg]);
  };

  // Auth Handlers
  const handleSignIn = () => {
    setIsAuthenticated(true);
    setActiveTab('home');
    setDetailedTimesheet(null);
    setReviewingTimesheet(null);
    showToast(language === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Signed in successfully!');
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setActiveTab('home');
    setDetailedTimesheet(null);
    setReviewingTimesheet(null);
    showToast(language === 'ar' ? 'تم تسجيل الخروج بنجاح.' : 'Signed out successfully.');
  };

  return (
    <div className={`min-h-screen flex flex-col ${!isAuthenticated && activeTab !== 'chat' ? 'bg-slate-50' : 'bg-[#f8fafc]'} ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      {/* 1. Top Privacy Notice Banner */}
      <TopBanner t={t} signedInUser={isAuthenticated ? t.userName : "CRMJSVC1"} />

      {/* 2. Main Navigation Bar */}
      <Navbar
        t={t}
        language={language}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setDetailedTimesheet(null);
          setReviewingTimesheet(null);
        }}
        onOpenSearch={() => setSearchModalOpen(true)}
        onNavigateProfile={() => {
          setActiveTab('profile');
          setDetailedTimesheet(null);
          setReviewingTimesheet(null);
        }}
        isAuthenticated={isAuthenticated}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        activeProject={activeProject}
        allProjects={ALL_PROJECTS}
        onSwitchProject={(id) => setActiveProjectId(id)}
      />

      {/* Main Body Content: When not authenticated and on home/signin tab, show SignInPage matching Image 1 & 2 */}
      {!isAuthenticated && activeTab !== 'chat' ? (
        <main className="flex-1 w-full bg-slate-50">
          <SignInPage
            t={t}
            language={language}
            onSignIn={handleSignIn}
            onNavigateHome={() => setActiveTab('home')}
          />
        </main>
      ) : (
        <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-8 py-6 md:py-8">
        {/* Tab 1: Home Dashboard */}
        {activeTab === 'home' && (
          <>
            <WelcomeBanner
              t={t}
              language={language}
              toggleLanguage={toggleLanguage}
              activeProject={activeProject}
            />

            <StatCards t={t} activeProject={activeProject} />

            <div className="grid grid-cols-12 gap-6 mt-6">
              {/* Left Column (Recent Timesheets + Company Documents) */}
              <div className="col-span-12 lg:col-span-8">
                <RecentTimesheets
                  t={t}
                  timesheetsData={timesheets}
                  onReviewTimesheet={handleReviewTimesheet}
                  onViewTimesheet={handleViewTimesheet}
                  onViewAll={() => {
                    setActiveTab('timesheets');
                    setDetailedTimesheet(null);
                    setReviewingTimesheet(null);
                  }}
                />

                <CompanyDocuments
                  t={t}
                  documentsData={documents}
                  onViewDoc={handleViewDoc}
                  onDownloadDoc={handleDownloadDoc}
                  onUpdateDoc={handleUpdateDoc}
                />
              </div>

              {/* Right Column (Contracts + Employee Status + Timesheet Status) */}
              <div className="col-span-12 lg:col-span-4">
                <RightSidebar
                  t={t}
                  language={language}
                  allProjects={ALL_PROJECTS}
                  activeProject={activeProject}
                  onSwitchProject={(id) => setActiveProjectId(id)}
                />
              </div>
            </div>
          </>
        )}

        {/* Tab 2: Timesheets View */}
        {activeTab === 'timesheets' && (
          reviewingTimesheet ? (
            <TimesheetReviewPage
              t={t}
              language={language}
              toggleLanguage={toggleLanguage}
              timesheet={reviewingTimesheet}
              onBack={() => setReviewingTimesheet(null)}
              onApproveTimesheet={handleApproveTimesheet}
              onUploadEditedVersion={handleUploadEditedVersion}
            />
          ) : detailedTimesheet ? (
            <TimesheetDetailView
              t={t}
              language={language}
              toggleLanguage={toggleLanguage}
              timesheet={detailedTimesheet}
              onBack={() => setDetailedTimesheet(null)}
            />
          ) : (
            <TimesheetsPage
              t={t}
              language={language}
              toggleLanguage={toggleLanguage}
              timesheetsData={timesheets}
              activeProject={activeProject}
              onReviewTimesheet={handleReviewTimesheet}
              onViewTimesheet={handleViewTimesheet}
            />
          )
        )}

        {/* Tab 3: Employees View matching Screenshot 2 */}
        {activeTab === 'employees' && (
          <EmployeesPage
            t={t}
            language={language}
            toggleLanguage={toggleLanguage}
          />
        )}

        {/* Tab 4: Requests View */}
        {activeTab === 'requests' && (
          <RequestsPage
            t={t}
            language={language}
            toggleLanguage={toggleLanguage}
            requestsData={requests}
            onOpenNewRequest={() => setNewRequestModalOpen(true)}
            onViewRequest={handleViewRequest}
          />
        )}

        {/* Tab 4: Project Chat View */}
        {activeTab === 'chat' && (
          <ProjectChatPage
            t={t}
            language={language}
            toggleLanguage={toggleLanguage}
            messages={chatMessages}
            onSendMessage={handleSendMessage}
          />
        )}

        {/* Tab 5: Profile View matching Screenshots */}
        {activeTab === 'profile' && (
          <ProfilePage
            t={t}
            language={language}
            onNavigateHome={() => setActiveTab('home')}
            onShowToast={showToast}
          />
        )}
      </main>
      )}

      {/* Footer */}
      <Footer t={t} onNavigate={(tab) => {
        setActiveTab(tab);
        setDetailedTimesheet(null);
        setReviewingTimesheet(null);
      }} />

      {/* View Request Details Modal */}
      <ViewRequestModal
        isOpen={viewRequestModalOpen}
        onClose={() => setViewRequestModalOpen(false)}
        request={selectedRequest}
        t={t}
        onAddComment={handleAddCommentToRequest}
      />

      {/* New Request Modal */}
      <NewRequestModal
        isOpen={newRequestModalOpen}
        onClose={() => setNewRequestModalOpen(false)}
        onSubmit={handleCreateNewRequest}
        t={t}
        language={language}
        allProjects={ALL_PROJECTS}
        activeProject={activeProject}
      />

      {/* Document View / Update Modal */}
      <DocumentModal
        isOpen={docModalOpen}
        onClose={() => setDocModalOpen(false)}
        document={selectedDoc}
        mode={docModalMode}
        onUploadSuccess={handleUploadSuccess}
        onSubmitForRequest={handleSubmitDocForRequest}
        t={t}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        t={t}
        onSelectTimesheet={(ts) => {
          handleViewTimesheet(ts);
        }}
        onSelectDoc={(doc) => {
          setSelectedDoc(doc);
          setDocModalMode('view');
          setDocModalOpen(true);
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#070b14]/95 backdrop-blur-xl text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-bottom-4 duration-200 border border-slate-750">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
