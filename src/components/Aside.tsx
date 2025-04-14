"use client";
import { useState, useEffect, SetStateAction } from 'react';
import '../app/styles/layout/Aside.css';

// Define os tipos para as seções e subtítulos
interface SubSection {
  id: string;
  title: string;
}

interface Section {
  id: string;
  title: string;
  subtitle: SubSection[];
}

export const Aside = ({ sections }: { sections: Section[] }) => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrollingFromClick, setIsScrollingFromClick] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Verificar se o scroll foi iniciado por um clique recente
      if (isScrollingFromClick) return;
      
      // Se passaram menos de 1000ms desde o último clique, ignora o scroll
      if (Date.now() - lastClickTime < 1000) return;

      const sectionElements = sections.flatMap(section => [
        ...(section.subtitle?.map(sub => document.getElementById(sub.id)) || []),
        document.getElementById(section.id),
      ]).filter(Boolean);
  
      // Encontra a seção mais próxima do topo
      let currentSection = null;
      let minDistance = Infinity;
  
      for (const section of sectionElements) {
        if (!section) continue;
  
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - 100); // 100px é o offset usado no scrollTo
        
        // Se estivermos próximos da seção ou for a mais próxima até agora
        if (distance < minDistance) {
          minDistance = distance;
          currentSection = section;
        }
      }
  
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    
    // Execute uma vez na montagem
    setTimeout(handleScroll, 100);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections, isScrollingFromClick, lastClickTime]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: SetStateAction<string>) => {
    e.preventDefault();
    const element = document.getElementById(id as string);
    
    if (element) {
      // Primeiro, atualize o estado ativo
      setActiveSection(id as string);
      
      // Marque que estamos scrollando de um clique
      setIsScrollingFromClick(true);
      setLastClickTime(Date.now());
      
      // Faça o scroll
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth',
      });
      
      // Atualize a URL
      window.history.pushState(null, '', `#${id}`);
      
      // Desative a flag de scroll após um tempo suficiente para o scroll terminar
      setTimeout(() => {
        setIsScrollingFromClick(false);
      }, 1000); // Aumentado para 1000ms para dar mais tempo
    }
  };

  return (
    <nav className="aside_main">
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(e) => scrollToSection(e, section.id)}
              className={activeSection === section.id ? 'active' : ''}
            >
              {section.title}
            </a>
            {section.subtitle && (
              <ul>
                {section.subtitle.map((sub) => (
                  <li key={sub.id}>
                    <a
                      href={`#${sub.id}`}
                      onClick={(e) => scrollToSection(e, sub.id)}
                      className={activeSection === sub.id ? 'active' : ''}
                    >
                      {sub.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};