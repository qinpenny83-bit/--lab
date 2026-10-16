import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import KnowledgePracticePage from './pages/KnowledgePracticePage';
import CasesPage from './pages/CasesPage';
import CaseFlowPage from './pages/CaseFlowPage';
import ObservationPage from './pages/ObservationPage';
import ObservationFlowPage from './pages/ObservationFlowPage';
import FormulaPage from './pages/FormulaPage';
import FormulaDetailPage from './pages/FormulaDetailPage';
import ClassicPage from './pages/ClassicPage';
import ClassicDetailPage from './pages/ClassicDetailPage';
import ParadoxPage from './pages/ParadoxPage';
import ParadoxFlowPage from './pages/ParadoxFlowPage';
import BrainPage from './pages/BrainPage';
import FamilyPage from './pages/FamilyPage';
import JourneyPage from './pages/JourneyPage';
import Stage5CoursePage from './pages/Stage5CoursePage';
import GoldenYinYangPage from './pages/GoldenYinYangPage';
import ContentBiblePage from './pages/ContentBiblePage';
import KnowledgeLibraryPage from './pages/KnowledgeLibraryPage';
import MustMemorizePage from './pages/MustMemorizePage';
import V33PracticePage from './pages/V33PracticePage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/journey/stage5/:chapterId" element={<Stage5CoursePage />} />
        <Route path="/course/:chapterId" element={<Stage5CoursePage />} />
        <Route path="/golden/yinyang" element={<GoldenYinYangPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/map/:topic" element={<KnowledgePracticePage />} />
        <Route path="/bible" element={<ContentBiblePage />} />
        <Route path="/library" element={<KnowledgeLibraryPage />} />
        <Route path="/memorize" element={<MustMemorizePage />} />
        <Route path="/practice/:nodeId" element={<V33PracticePage />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/cases/:id" element={<CaseFlowPage />} />
        <Route path="/observe" element={<ObservationPage />} />
        <Route path="/observe/:id" element={<ObservationFlowPage />} />
        <Route path="/formula" element={<FormulaPage />} />
        <Route path="/formula/:id" element={<FormulaDetailPage />} />
        <Route path="/classic" element={<ClassicPage />} />
        <Route path="/classic/:id" element={<ClassicDetailPage />} />
        <Route path="/paradox" element={<ParadoxPage />} />
        <Route path="/paradox/:id" element={<ParadoxFlowPage />} />
        <Route path="/brain" element={<BrainPage />} />
        <Route path="/family" element={<FamilyPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Layout>
  );
}
