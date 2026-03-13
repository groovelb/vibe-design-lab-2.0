import r1 from '../assets/reivew/r1.webp';
import r2 from '../assets/reivew/r2.webp';
import r3 from '../assets/reivew/r3.webp';
import r4 from '../assets/reivew/r4.webp';

const webinarReviews = [
  {
    url: 'https://www.threads.com/@lapin_dev/post/DRABU_uAdL8',
    userId: 'lapin_dev',
    content: '디자인 개쩌는 사이트에는 이유가 있었네요 오늘 @dddesign.io 님의 비밀을 일부나마 엿볼 수 있어서 너무 좋았습니다! 스토리북도 정말 신기하네요. 바로 알아봐야겠습니다 오늘 웨비나 감사드립니다!',
  },
  {
    url: 'https://www.threads.com/@junn.jeong/post/DRAH3wUEi8x',
    userId: 'junn.jeong',
    content: '요즘 웬만한 유료강의도 실망스러운게 많은데.. 정말 인사이트있는 무료웨비나였습니다',
  },
  {
    url: 'https://www.threads.com/@imhada.rim/post/DTQRIlJCZ4E',
    userId: 'imhada.rim',
    content: '클로드코드한테 디자인 고쳐달라고 할 수록 페이지마다 디자인이 들쑥날쑥한 게 마음에 안 들었다. 아까운 내 크레딧😭 그러던 와중에 vibe design labs 에서 무료 웨비나가 있어서 들어봤다. 제미나이한테 물어보니까 디자인시스템, 스토리북이 이래서 필요한 거구나 알게 됐다. 5회차부터 중간에 들어서 이해는 잘 못했지만 4회차부터 따라가봐야지. 오늘 웨비나 감사합니다🥹 @dddesign.io',
  },
  {
    url: 'https://www.threads.com/@zenithlogan/post/DRADp-Sk3Qc',
    userId: 'zenithlogan',
    content: '오랜말에 강의팔이가 아닌, 진솔된 분의 웨비나를 들은 느낌. 많이 배웠습니다 :)',
  },
  {
    url: 'https://www.threads.com/@seosa.log/post/DTQG8MNASTi',
    userId: 'seosa.log',
    content: '바이브코딩 한 번 해봐야지 해봐야지.. 염불만 외다 우연히 듣게 된 웨비나..! 유료로 들었어도 아깝지 않을 내용이었다. 방향성이 잡혔으니 해봐야지 🔥 진짜(?)',
  },
  {
    url: 'https://www.threads.com/@babybenet/post/DTQO_UsAUPl',
    userId: 'babybenet',
    content: '벌써 DDD님 웨비나 5번째 참석, 문제를 맞이했을때 일종의 추상화를 통해 필요한 조각?을 선택하고 이를 조합해 해결하는 훈련이 중요하다 강조하셨다. (역시나!) 오늘도 역시 친근한 톤으로 편안하게 진행해주셔서 아주 잘 배우고 왔음 감사해요!',
  },
  {
    url: 'https://www.threads.com/@yubufox/post/DRACLTNkp7S',
    userId: 'yubufox',
    content: '프론트 디자인은 가장 어렵고 못하고 하기싫은것 중 하나다. 피그마도 써봤지만 MCP를 써도 \'해줘\' 로 만드는것과는 거리가 있다. 개발툴과 에이전트로만 웹사이트 디자인을 구현하는 방법을 계속 찾아해매고 있었는데 방법을 어느정도 찾은것 같다. ddd님의 웨비나가 도움이 됐다. 하고싶은 디자인을 미리 구상해서, 스토리북으로 구현할 내용을 체계적으로 정리, 그리고 이를 바탕으로 바이브코딩하는 프로세스다. 다만 내가 하고싶은 디자인을 찾는것부터가 문제인데, 구글 Stitch, sleek design 등을 통해 시안을 만들어보고 레퍼런스 사이트도 참고하면서 만들고싶은 디자인을 찾으면 된다.',
  },
  {
    url: 'https://www.threads.com/@webplanning.kr/post/DRABj4Ik6ED',
    userId: 'webplanning.kr',
    content: '@dddesign.io 님의 웨비나. 바이브코팅에 관해 디자인 시스템부터 서비스 설계까지의 접근 방식을 배울수 있어 좋았다. 디자인 토큰과 스토리북 등을 실제 작업과정에서 활용하는 과정이 바이브코팅을 배워볼까 하게 만들었다. 인내와 오기가 필요하다고 말하는 솔직한 점이 다른 웨비나와 차별점 이랄까🤭',
  },
  {
    url: 'https://www.threads.com/@yeoul_97/post/DTQJFUikTms',
    userId: 'yeoul_97',
    content: '@dddesign.io 님의 5주차 웨비나 참여했습니다 실제 베포된 결과물을 바탕으로 다시 만들면서 어떤 의도로 만드셨는지 설명해주셨구요 실시간으로 참여 + Q&A 하면서 많이 배웠습니다 ㅎㅎ 특히, 웨비나 도중 클로드 코드 5시간 세션 만료가 되셔서 extra usage 로 api 30불을 실시간으로 결제하시는 모습에 박수를 치면서 봤습니다 ㅎㅎ 좋은 인사이트 나눔해주셔서 정말 감사드립니다 🙇‍♂️',
  },
  {
    url: 'https://www.threads.com/@jian.bak/post/DRAQmdhE_rj',
    userId: 'jian.bak',
    content: 'DDD님 정말 늦게까지 수고많으셨어요. 갑자기 말 안 듣는 AI는 라이브의 묘미 아니겠습니까 ㅎㅎ 당황스러운 상황에도 열심히 방법을 찾아가시는 모습이 오히려 인상적이었습니다. 사실 AI랑 말이 안 통하는 날이 더 많잖아요? 그래서 더 실전같은 느낌을 받았습니다. 더구나 디자인 베이스셔서 매우 반가운 강의였어요. 다음 시간이 더욱 기대돼요 😆',
  },
  {
    url: 'https://www.threads.com/@nerd_makr/post/DQ__nG0k052',
    userId: 'nerd_makr',
    content: '@dddesign.io 님의 철학을 엿볼 수 있어서 너무 좋았구요. 잘하는 사람의 작업 프로세스를 직접 따라가는 것만큼 좋은 학습 방법이 없다고 생각하는데, 웨비나에서 볼 수 있어서 너무 좋았습니다. 최근에 어떻게 하면 AI를 이용해서 원하는 느낌의 UI/UX를 매끄럽게 구현할 수 있을까 고민이 많았는데 storybook도 그렇고, 이미 갖춰진 디자인 시스템을 이용하는 것도 그렇고 많은 키워드 얻어갑니다! 좋은 인사이트 공유해주셔서 정말 감사합니다.',
  },
  {
    url: 'https://www.threads.com/@jazzrang/post/DRAE1T6kqo7',
    userId: 'jazzrang',
    content: '@dddesign.io 님의 첫번째 웨비나 후기 스레드에서 DDD님의 글을 우연히 발견하고, 손꼽아 기다린 첫 웨비나에서 바이브코딩에 디자인을 접목시킨 DDD님의 많은 꿀팁과 영감이 샘솟는 알찬 시간이었습니다. 향후 열릴 오프라인 강의도 너무 기대되네요.',
  },
  {
    url: 'https://www.threads.com/@hello.kimleah/post/DQ_4hTKDrhc',
    userId: 'hello.kimleah',
    content: '오늘 새벽에 눈비비고 일어나서 Dddesign님이 진행한 Vibe Coding 웨비나를 봤어! 개발환경 셋업하는 걸 완전 초보 눈높이로 하나씩 설명해주셔서 이해하기 쉬웠고, npm 개념도 비유로 풀어서 설명해주셔서 머리에 쏙 들어왔음. 나는 이미 Storybook을 써본 적이 있었는데, 이번엔 vibe coding 안에서 실제로 어떻게 쓰이는지 볼 수 있어서 재밌었어. 가장 인상 깊었던 건 이번 강의 예시였던 조명 비교 웹사이트! 요즘 스레드에서 한 번쯤 봤을텐데, 밝기를 조절하면서 어둠속에서 조명 불빛이 어떻게 퍼지는지 보여주는 사이트야. Dddesign님은 그냥 on/off로 끝내지 않고 밝기 조절 기능을 구현하셨더라구. 게다가 모든 조명의 온도를 다 똑같이 맞추셨음! 그 덕분에 디자인이 되게 따뜻하고 일관성있어서 보기 좋았던 거였어.',
  },
  {
    url: 'https://www.threads.com/@soul____life/post/DTQKU88Eg2X',
    userId: 'soul____life',
    content: '@dddesign.io 클로드 2번이나 추가 결제까지 하면서 열정적인 웨비나 잘 봤습니다.',
  },
];

const courseReviews = [
  {
    name: '이XX',
    role: '디자이너',
    company: '',
    image: r4,
    content: '개발 코드 하나도 모르는 디자이너가 바이브코딩을 들으면 어떨까 했는데 생각보다(?) 끝까지 따라갈 수 있었어요. 물론 강사님 말 한 문장 한 문장 이해하려고 머리 쓰느라 쉽진 않았지만, 계속 설명해주시고 비유도 잘 해주셔서 포기하지 않게 되더라고요. 무엇보다 이론이 아니라 "이렇게 완성해서 실제로 쓰면 된다"는 기준으로 알려주셔서 실무에 바로 적용해보고 싶다는 생각이 들었습니다 👍 기회가 되면, 실제로 적용한 형태도 만들어서 공유해보려고 합니다😀',
    recommender: 'Data Driven Design 대표 DDD',
  },
  {
    name: '윤XX',
    role: '디자이너',
    company: '디지털 마케팅 에이전시',
    image: r1,
    content: '기획 의도를 정확히 반영한 디자인을 웹 상에 시각화하는 데 큰 도움이 되었고, AI 기술의 도입으로 이제는 원하는 결과물을 혼자서도 디자인하고 구현할 수 있는 역량이 생겼습니다. 이전에는 디자인 시안과 실제 구현 간의 괴리로 인해 소통이 쉽지 않았지만, 이제는 디자인과 코딩 결과물을 동시에 확인하며 의견을 주고받을 수 있어 커뮤니케이션이 훨씬 원활해졌습니다. 시각적 품질은 물론, 협업 과정에서도 큰 만족을 느끼고 있으며, 앞으로의 프로젝트에서도 더욱 효과적인 결과를 기대하고 있습니다.',
    recommender: 'Data Driven Design 대표 DDD',
  },
  {
    name: '문XX',
    role: '디자이너',
    company: '해외 취업 준비',
    image: r2,
    content: '디디디님과 5주간 UX/UI의 기본기를 차근차근 다지고, 마지막 1주는 내가 만들고 싶었던 웹사이트를 직접 기획하고 구현해보았습니다. 특히 Cursor를 활용해서 인터랙티브 웹을 만들어본 건 처음이었는데, 자유롭게 실험하고, 수정하고, 다시 시도하면서 디자인과 개발 사이의 벽을 허무는 경험을 할 수 있었던 게 인상적이었어요. 이번 기회를 통해 AI 도구들과 가까워질 수 있었습니다. 기초부터 실전까지 이어지는 이 커리큘럼을 통해, 막연했던 아이디어가 점점 구체적인 형태를 갖춰가는 과정이 정말 재미있었어요. 무엇보다 단순한 툴 사용법을 배우는 데 그치지 않고, \'만들고 싶었던 것\'을 직접 만들어보며 디자인과 기술을 유기적으로 연결시켜보는 경험이 가장 큰 장점이었다고 생각합니다. 디자인과 개발, 그리고 AI에 흥미가 있다면 꼭 한번 도전해보시길 추천드립니다! :)',
    recommender: 'Data Driven Design 대표 DDD',
  },
  {
    name: '노XX',
    role: 'UX 기획자',
    company: '',
    image: r3,
    content: 'UX기획/UI디자인 업무를 하면서 생각나는 사이드 프로젝트 아이디어를 직접 만들어볼 기회가 없어 아쉬웠는데, DDD님의 강의를 들으면서 작은 웹서비스를 만들고 출시할 수 있게 되었습니다! 강사님이 비전공자의 시선에 맞춰 개발환경 세팅부터 차근차근 가르쳐주십니다. 리액트와 피그마 프로퍼티를 연결하여 어떤 식으로 화면과 요소를 구조화하여 생성형AI에게 코드를 요청해야하는지 배웠어요. 자기 아이디어를 구현해보고픈 디자이너는 꼭 들어보시면 좋겠습니다!',
    recommender: 'Data Driven Design 대표 DDD',
  },
  {
    name: '이XX',
    role: '디자이너',
    company: '',
    image: r4,
    content: '개발 코드 하나도 모르는 디자이너가 바이브코딩을 들으면 어떨까 했는데 생각보다(?) 끝까지 따라갈 수 있었어요. 물론 강사님 말 한 문장 한 문장 이해하려고 머리 쓰느라 쉽진 않았지만, 계속 설명해주시고 비유도 잘 해주셔서 포기하지 않게 되더라고요. 무엇보다 이론이 아니라 "이렇게 완성해서 실제로 쓰면 된다"는 기준으로 알려주셔서 실무에 바로 적용해보고 싶다는 생각이 들었습니다 👍 기회가 되면, 실제로 적용한 형태도 만들어서 공유해보려고 합니다😀',
    recommender: 'Data Driven Design 대표 DDD',
  },
  {
    name: '윤XX',
    role: '디자이너',
    company: '디지털 마케팅 에이전시',
    image: r1,
    content: '기획 의도를 정확히 반영한 디자인을 웹 상에 시각화하는 데 큰 도움이 되었고, AI 기술의 도입으로 이제는 원하는 결과물을 혼자서도 디자인하고 구현할 수 있는 역량이 생겼습니다. 이전에는 디자인 시안과 실제 구현 간의 괴리로 인해 소통이 쉽지 않았지만, 이제는 디자인과 코딩 결과물을 동시에 확인하며 의견을 주고받을 수 있어 커뮤니케이션이 훨씬 원활해졌습니다. 시각적 품질은 물론, 협업 과정에서도 큰 만족을 느끼고 있으며, 앞으로의 프로젝트에서도 더욱 효과적인 결과를 기대하고 있습니다.',
    recommender: 'Data Driven Design 대표 DDD',
  },
  {
    name: '문XX',
    role: '디자이너',
    company: '해외 취업 준비',
    image: r2,
    content: '디디디님과 5주간 UX/UI의 기본기를 차근차근 다지고, 마지막 1주는 내가 만들고 싶었던 웹사이트를 직접 기획하고 구현해보았습니다. 특히 Cursor를 활용해서 인터랙티브 웹을 만들어본 건 처음이었는데, 자유롭게 실험하고, 수정하고, 다시 시도하면서 디자인과 개발 사이의 벽을 허무는 경험을 할 수 있었던 게 인상적이었어요. 이번 기회를 통해 AI 도구들과 가까워질 수 있었습니다. 기초부터 실전까지 이어지는 이 커리큘럼을 통해, 막연했던 아이디어가 점점 구체적인 형태를 갖춰가는 과정이 정말 재미있었어요. 무엇보다 단순한 툴 사용법을 배우는 데 그치지 않고, \'만들고 싶었던 것\'을 직접 만들어보며 디자인과 기술을 유기적으로 연결시켜보는 경험이 가장 큰 장점이었다고 생각합니다. 디자인과 개발, 그리고 AI에 흥미가 있다면 꼭 한번 도전해보시길 추천드립니다! :)',
    recommender: 'Data Driven Design 대표 DDD',
  },
  {
    name: '노XX',
    role: 'UX 기획자',
    company: '',
    image: r3,
    content: 'UX기획/UI디자인 업무를 하면서 생각나는 사이드 프로젝트 아이디어를 직접 만들어볼 기회가 없어 아쉬웠는데, DDD님의 강의를 들으면서 작은 웹서비스를 만들고 출시할 수 있게 되었습니다! 강사님이 비전공자의 시선에 맞춰 개발환경 세팅부터 차근차근 가르쳐주십니다. 리액트와 피그마 프로퍼티를 연결하여 어떤 식으로 화면과 요소를 구조화하여 생성형AI에게 코드를 요청해야하는지 배웠어요. 자기 아이디어를 구현해보고픈 디자이너는 꼭 들어보시면 좋겠습니다!',
    recommender: 'Data Driven Design 대표 DDD',
  },
];

export { webinarReviews, courseReviews };
export default webinarReviews;

