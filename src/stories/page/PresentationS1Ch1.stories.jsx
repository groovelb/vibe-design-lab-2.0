'use client';
import { useState } from 'react';
import { SlideMaster } from '../../components/presentation';
import { S1_Ch1 } from '../../data/presentations';
import { flattenSlides, DrawerToC } from './presentationUtils';

export default {
  title: 'Page/Presentation/S1-Ch1',
  parameters: { layout: 'fullscreen' },
};

const allSlides = flattenSlides(S1_Ch1);

export const Docs = {
  render: () => {
    const [idx, setIdx] = useState(0);
    const slide = allSlides[idx];

    return (
      <SlideMaster
        breadcrumb={slide.breadcrumb}
        slideTitle={slide.title}
        slideIndex={idx + 1}
        totalSlides={allSlides.length}
        onPrev={() => setIdx((p) => Math.max(0, p - 1))}
        onNext={() => setIdx((p) => Math.min(allSlides.length - 1, p + 1))}
        drawerContent={<DrawerToC slides={allSlides} currentIdx={idx} onSelect={setIdx} />}
      >
        {slide.render()}
      </SlideMaster>
    );
  },
};
