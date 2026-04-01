import { CourseDetailPage } from '../../../src/components/page/CourseDetailPage';
import { COURSES } from '@/data/landingMockData';

const COURSE_META = {
  'starter-kit': {
    title: 'Vibe Design Starter Kit — 디자인으로 배우는 바이브 코딩',
    description:
      '디자인 사고로 제품을 설계하는 바이브 코딩 강의. 프로덕트 디자이너·프론트엔드 개발자를 위한 4주 코호트. 디자인 시스템과 AI 언어 체계를 실전에 적용합니다.',
    ogDescription:
      '되는 대로가 아니라 의도대로. 디자인 언어 체계로 바이브 코딩의 결과를 통제하는 4주 코호트.',
  },
};

const FALLBACK_META = {
  title: '코스',
  description: 'Vibe Design Lab의 바이브 코딩 교육 코스.',
  ogDescription: '디자이너를 위한 바이브 코딩 교육.',
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = COURSE_META[slug] || FALLBACK_META;

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.ogDescription,
    },
    alternates: {
      canonical: `https://vibedesignlab.net/course/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return COURSES.map((course) => ({ slug: course.slug }));
}

const COURSE_JSONLD = {
  'starter-kit': {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Vibe Design Starter Kit',
    description:
      '디자인 사고로 제품을 설계하는 바이브 코딩 강의. 프로덕트 디자이너·프론트엔드 개발자를 위한 4주 코호트.',
    provider: {
      '@type': 'Organization',
      name: 'Vibe Design Lab',
      url: 'https://vibedesignlab.net',
    },
    educationalLevel: 'Intermediate',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'Professional',
      audienceType: '프로덕트 디자이너, 프론트엔드 개발자',
    },
    inLanguage: 'ko',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      duration: 'P4W',
    },
    offers: {
      '@type': 'Offer',
      price: '525000',
      priceCurrency: 'KRW',
      availability: 'https://schema.org/InStock',
    },
  },
};

export default async function CourseSlugPage({ params }) {
  const { slug } = await params;
  const jsonLd = COURSE_JSONLD[slug];

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <CourseDetailPage />
    </>
  );
}
