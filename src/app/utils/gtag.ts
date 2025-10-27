declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

// Page tracking
export const trackPage = (page_title: string) => {
  gtag('event', 'page_view', {
    page_title,
    page_location: window.location.href
  });
};

// Chat events
export const trackChatMessage = (message: string, role: 'user' | 'assistant') => {
  gtag('event', 'chat_message', {
    message_type: role,
    message_length: message.length
  });
};

export const trackChatStart = () => {
  gtag('event', 'chat_start');
};

// Quiz events
export const trackQuizStart = () => {
  gtag('event', 'quiz_start');
};

export const trackQuizAnswer = (question: number, correct: boolean) => {
  gtag('event', 'quiz_answer', {
    question_number: question,
    is_correct: correct
  });
};

export const trackQuizComplete = (score: number, total: number, title: string) => {
  gtag('event', 'quiz_complete', {
    score,
    total_questions: total,
    result_title: title,
    success_rate: Math.round((score / total) * 100)
  });
};

// Navigation
export const trackClick = (element: string, destination?: string) => {
  gtag('event', 'click', {
    element_name: element,
    destination
  });
};

// Brand clicks
export const trackBrandClick = (brand: 'natura' | 'avon') => {
  gtag('event', 'brand_click', {
    brand_name: brand
  });
};

// Certificate
export const trackCertificate = (action: 'generate' | 'share', title: string) => {
  gtag('event', 'certificate_' + action, {
    result_title: title
  });
};

// Coupon
export const trackCoupon = (code: string) => {
  gtag('event', 'coupon_copy', {
    coupon_code: code
  });
};