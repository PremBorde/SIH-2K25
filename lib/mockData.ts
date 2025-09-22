// Mock data for the AthletConnect platform
export interface Athlete {
  id: string;
  name: string;
  age: number;
  sport: string;
  location: string;
  profilePicture: string;
  coverPhoto: string;
  height: string;
  weight: string;
  personalBests: Record<string, string>;
  testResults: TestResult[];
  achievements: string[];
  videos: string[];
  verified: boolean;
  following: boolean;
}

export interface TestResult {
  testName: string;
  score: number;
  unit: string;
  date: string;
  percentile: number;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: 'scholarship' | 'trial' | 'camp' | 'coaching';
  sport: string;
  location: string;
  deadline: string;
  description: string;
  requirements: string[];
  applied: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: Athlete[];
  lastMessage: Message;
  unreadCount: number;
}

export interface Test {
  id: string;
  name: string;
  description: string;
  duration: string;
  equipment: string[];
  instructions: string[];
  icon: string;
}

// Mock Athletes Data
export const mockAthletes: Athlete[] = [
  {
    id: '1',
    name: 'Neeraj Chopra',
    age: 27,
    sport: 'Athletics (Javelin Throw)',
    location: 'Khandra, Panipat, Haryana, India',
    profilePicture: '/Images/profile_pic.png',
    coverPhoto: '/Images/Cover.jpg',
    height: "5'11\"",
    weight: '86 kg',
    personalBests: {
      'Javelin Throw': '89.94m',
      'National Record': '89.94m',
      'Asian Record': '89.94m'
    },
    testResults: [
      { testName: 'Vertical Jump', score: 35, unit: 'inches', date: '2023-11-18', percentile: 90 },
      { testName: 'Sprint 40yd', score: 4.5, unit: 'seconds', date: '2023-11-20', percentile: 95 },
      { testName: 'Strength Test', score: 200, unit: 'kg', date: '2023-11-15', percentile: 98 }
    ],
    achievements: [
      'Olympic Gold (Tokyo 2020)',
      'World Championship Gold (2023)',
      '2018 Commonwealth Games Gold',
      '2018 Asian Games Gold (Games Record)',
      '2016 World U20 Championships Gold (World Junior Record)',
      'Diamond League Winner 2022',
      'Padma Shri (2022)',
      'Arjuna Award (2018)',
      'Khel Ratna Award (2021)',
      'Param Vishisht Seva Medal'
    ],
    videos: [
      'Tokyo Olympics Gold Medal Throw',
      '2023 World Championships Winning Throw',
      'Diamond League Highlights'
    ],
    verified: true,
    following: true
  },
  {
    id: '2',
    name: 'Arjun Singh',
    age: 20,
    sport: 'Basketball',
    location: 'Delhi, India',
    profilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
    coverPhoto: 'https://images.pexels.com/photos/1544537/pexels-photo-1544537.jpeg',
    height: "6'4\"",
    weight: '190 lbs',
    personalBests: {
      'Free Throws': '87%',
      '3-Point': '42%',
      'PPG': '18.5'
    },
    testResults: [
      { testName: 'Vertical Jump', score: 32, unit: 'inches', date: '2024-01-14', percentile: 95 },
      { testName: 'Agility Test', score: 6.2, unit: 'seconds', date: '2024-01-11', percentile: 88 },
      { testName: 'Bench Press', score: 185, unit: 'lbs', date: '2024-01-09', percentile: 82 }
    ],
    achievements: [
      'All-Conference First Team',
      'Freshman of the Year',
      'Tournament MVP'
    ],
    videos: [
      'Highlight Reel 2024',
      'Skills Training'
    ],
    verified: true,
    following: true
  },
  {
    id: '3',
    name: 'Priya Sharma',
    age: 19,
    sport: 'Soccer',
    location: 'Mumbai, India',
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    coverPhoto: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg',
    height: "5'6\"",
    weight: '125 lbs',
    personalBests: {
      'Goals': '24 (season)',
      'Assists': '12 (season)',
      'Top Speed': '22.3 mph'
    },
    testResults: [
      { testName: 'Sprint 40yd', score: 5.1, unit: 'seconds', date: '2024-01-13', percentile: 89 },
      { testName: 'Endurance Run', score: 6.2, unit: 'minutes/mile', date: '2024-01-08', percentile: 91 },
      { testName: 'Agility Test', score: 5.8, unit: 'seconds', date: '2024-01-07', percentile: 93 }
    ],
    achievements: [
      'Leading Goal Scorer',
      'Team Captain',
      'All-American Honors'
    ],
    videos: [
      'Goal Compilation',
      'Technical Skills'
    ],
    verified: false,
    following: false
  },
  {
    id: '4',
    name: 'Neeraj Chopra',
    age: 26,
    sport: 'Track & Field',
    location: 'Panipat, India',
    profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Neeraj_Chopra_cropped.jpg/800px-Neeraj_Chopra_cropped.jpg',
    coverPhoto: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Neeraj_Chopra_cropped.jpg',
    height: "6'0\"",
    weight: '86 kg',
    personalBests: {
      'Javelin Throw': '89.94m'
    },
    testResults: [
      { testName: 'Sprint 40yd', score: 4.5, unit: 'seconds', date: '2023-11-20', percentile: 95 },
      { testName: 'Vertical Jump', score: 35, unit: 'inches', date: '2023-11-18', percentile: 90 }
    ],
    achievements: [
      'Olympic Gold (Tokyo 2020)',
      'World Championship Gold (2023)'
    ],
    videos: [
      'Olympic Gold Throw',
      'Training Highlights 2023'
    ],
    verified: true,
    following: false
  },
  {
    id: '5',
    name: 'Mary Kom',
    age: 41,
    sport: 'Boxing',
    location: 'Manipur, India',
    profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Mary_Kom_at_the_Women%27s_Boxing_Championship_in_New_Delhi.jpg/800px-Mary_Kom_at_the_Women%27s_Boxing_Championship_in_New_Delhi.jpg',
    coverPhoto: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Mary_Kom_at_the_Women%27s_Boxing_Championship_in_New_Delhi.jpg',
    height: "5'2\"",
    weight: '51 kg',
    personalBests: {
      'Amateur Bouts Won': '200+',
      'Professional Bouts Won': '5'
    },
    testResults: [
      { testName: 'Agility Test', score: 5.0, unit: 'seconds', date: '2023-10-01', percentile: 92 },
      { testName: 'Endurance Run', score: 5.5, unit: 'min/mile', date: '2023-09-28', percentile: 88 }
    ],
    achievements: [
      '6-time World Champion',
      'Olympic Bronze (2012)',
      'Padma Bhushan recipient'
    ],
    videos: [
      'World Championship Final',
      'Training Motivation'
    ],
    verified: true,
    following: true
  },
  {
    id: '6',
    name: 'PV Sindhu',
    age: 28,
    sport: 'Badminton',
    location: 'Hyderabad, India',
    profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/PV_Sindhu_IMG_9918_%28cropped%29.jpg/800px-PV_Sindhu_IMG_9918_%28cropped%29.jpg',
    coverPhoto: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/PV_Sindhu_IMG_9918_%28cropped%29.jpg',
    height: "5'11\"",
    weight: '65 kg',
    personalBests: {
      'Smash Speed': '400 km/h',
      'Tournament Wins': '10+'
    },
    testResults: [
      { testName: 'Vertical Jump', score: 25, unit: 'inches', date: '2023-12-05', percentile: 80 },
      { testName: 'Agility Test', score: 5.3, unit: 'seconds', date: '2023-12-03', percentile: 90 }
    ],
    achievements: [
      'Olympic Silver (2016)',
      'Olympic Bronze (2021)',
      'World Championship Gold (2019)',
      'Padma Shri recipient'
    ],
    videos: [
      'Rio Olympics Final Highlights',
      'World Championship Winning Match'
    ],
    verified: true,
    following: false
  },
  {
    id: '7',
    name: 'Sports Authority of India',
    age: 0,
    sport: 'Organization',
    location: 'New Delhi, India',
    profilePicture: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Sports_Authority_of_India_logo.svg/200px-Sports_Authority_of_India_logo.svg.png',
    coverPhoto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Sports_Authority_of_India_Headquarters.jpg/800px-Sports_Authority_of_India_Headquarters.jpg',
    height: "N/A",
    weight: 'N/A',
    personalBests: {
      'Athletes Supported': '5000+',
      'Centers': '50+',
      'Olympic Medals': '35+'
    },
    testResults: [
      { testName: 'National Programs', score: 25, unit: 'sports', date: '2024-01-01', percentile: 100 },
      { testName: 'Training Centers', score: 50, unit: 'centers', date: '2024-01-01', percentile: 100 }
    ],
    achievements: [
      'Government of India Organization',
      'National Sports Development Authority',
      'Olympic Training Support',
      'Grassroots Sports Development'
    ],
    videos: [
      'SAI Training Facilities',
      'National Sports Programs'
    ],
    verified: true,
    following: true
  }
];

// Mock Tests Data
export const mockTests: Test[] = [
  {
    id: 'pushup',
    name: 'Push-up Test',
    description: 'Measure upper body strength and endurance',
    duration: '2 minutes',
    equipment: ['Camera'],
    instructions: [
      'Position yourself in a standard push-up position',
      'Keep your body straight from head to heels',
      'Lower your chest to nearly touch the ground',
      'Push back up to starting position',
      'Complete as many reps as possible in 2 minutes'
    ],
    icon: '💪'
  },
  {
    id: 'squat',
    name: 'Squat Test',
    description: 'Assess lower body strength and form',
    duration: '3 minutes',
    equipment: ['Camera'],
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body as if sitting back into a chair',
      'Keep your chest up and knees behind toes',
      'Return to standing position',
      'Complete as many quality reps as possible'
    ],
    icon: '🦵'
  },
  {
    id: 'vertical-jump',
    name: 'Vertical Jump',
    description: 'Measure explosive leg power',
    duration: '5 minutes',
    equipment: ['Camera', 'Wall or measuring device'],
    instructions: [
      'Stand next to a wall with one arm raised',
      'Mark your reach height',
      'Jump as high as possible',
      'Mark the highest point reached',
      'Take the best of 3 attempts'
    ],
    icon: '⬆️'
  },
  {
    id: 'sprint',
    name: '40-Yard Sprint',
    description: 'Test acceleration and top speed',
    duration: '10 minutes',
    equipment: ['Camera', '40-yard course'],
    instructions: [
      'Set up a 40-yard straight course',
      'Start in a 3-point stance',
      'Sprint as fast as possible to the finish',
      'Record your best time',
      'Take 3 attempts with full recovery'
    ],
    icon: '🏃'
  },
  {
    id: 'agility',
    name: 'Agility Test',
    description: 'Measure quickness and change of direction',
    duration: '8 minutes',
    equipment: ['Camera', 'Cones'],
    instructions: [
      'Set up a 5-10-5 cone drill',
      'Start at the middle cone',
      'Sprint to one side, touch the cone',
      'Sprint to the far cone, touch it',
      'Sprint back through the middle'
    ],
    icon: '🔄'
  },
  {
    id: 'endurance',
    name: 'Endurance Run',
    description: 'Test cardiovascular fitness',
    duration: '15 minutes',
    equipment: ['GPS watch or track'],
    instructions: [
      'Run at a steady, challenging pace',
      'Complete a 1.5-mile distance',
      'Maintain consistent effort throughout',
      'Record your finish time',
      'Cool down with light walking'
    ],
    icon: '🏃‍♀️'
  }
];

// Mock Opportunities Data
export const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'D1 Track & Field Scholarship',
    organization: 'Stanford University',
    type: 'scholarship',
    sport: 'Track & Field',
    location: 'Stanford, CA',
    deadline: '2024-03-15',
    description: 'Full ride scholarship for exceptional track and field athletes with strong academic performance.',
    requirements: [
      'Sub-11.5 100m or equivalent performance',
      'Minimum 3.5 GPA',
      'SAT score above 1400',
      'Leadership experience'
    ],
    applied: false
  },
  {
    id: '2',
    title: 'Elite Basketball Training Camp',
    organization: 'Nike Elite Skills',
    type: 'camp',
    sport: 'Basketball',
    location: 'Los Angeles, CA',
    deadline: '2024-02-28',
    description: 'Intensive 5-day training camp for top high school basketball prospects.',
    requirements: [
      'High school varsity player',
      'Coach recommendation',
      'Video highlights submission',
      'Height minimum 6\'0"'
    ],
    applied: true
  },
  {
    id: '3',
    title: 'Professional Soccer Trials',
    organization: 'MLS Next Pro',
    type: 'trial',
    sport: 'Soccer',
    location: 'Multiple Cities',
    deadline: '2024-04-01',
    description: 'Open trials for MLS Next Pro teams. Opportunity to earn a professional contract.',
    requirements: [
      'Age 18-23',
      'College or academy experience',
      'Valid passport',
      'Medical clearance'
    ],
    applied: false
  },
  {
    id: '4',
    title: 'Olympic Development Coaching',
    organization: 'USA Track & Field',
    type: 'coaching',
    sport: 'Track & Field',
    location: 'Colorado Springs, CO',
    deadline: '2024-03-01',
    description: 'Elite coaching program for athletes with Olympic potential.',
    requirements: [
      'National-level performance times',
      'Clean drug test history',
      'Commitment to relocate',
      'Age under 25'
    ],
    applied: false
  }
];

// Mock Messages Data
export const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [mockAthletes[0], mockAthletes[1]],
    lastMessage: {
      id: '1',
      senderId: '2',
      senderName: 'Arjun Singh',
      content: 'Hey Priya! Great performance at the meet yesterday. Would love to connect and maybe train together sometime.',
      timestamp: '2024-01-15T14:30:00Z',
      read: false
    },
    unreadCount: 2
  },
  {
    id: '2',
    participants: [mockAthletes[0], mockAthletes[2]],
    lastMessage: {
      id: '2',
      senderId: '1',
      senderName: 'Neeraj Chopra',
      content: 'Thanks for the tips on sprint training! Really helped improve my technique.',
      timestamp: '2024-01-14T09:15:00Z',
      read: true
    },
    unreadCount: 0
  },
  {
    id: '6',
    participants: [mockAthletes[0], mockAthletes[6]], // SAI Organization
    lastMessage: {
      id: '6',
      senderId: '7',
      senderName: 'Sports Authority of India',
      content: 'Congratulations on your recent achievements! We are pleased to invite you to our elite training program at SAI Bangalore. Your performance metrics show excellent potential for international competition.',
      timestamp: '2024-01-18T10:00:00Z',
      read: false
    },
    unreadCount: 1
  },
  // Indian athletes conversations
  {
    id: '3',
    participants: [mockAthletes[0], mockAthletes[5]], // Mary Kom
    lastMessage: {
      id: '3',
      senderId: mockAthletes[5].id,
      senderName: mockAthletes[5].name,
      content: 'Proud to see your dedication. Keep the discipline and the results will follow. Let me know if you want a quick mitt session!',
      timestamp: '2024-01-16T10:00:00Z',
      read: false
    },
    unreadCount: 1
  },
  {
    id: '4',
    participants: [mockAthletes[0], mockAthletes[5]], // PV Sindhu
    lastMessage: {
      id: '4',
      senderId: mockAthletes[5].id,
      senderName: mockAthletes[5].name,
      content: 'Footwork drills really boosted my agility. Try 4x30s ladder drills before your sprint sets. Share your times!',
      timestamp: '2024-01-16T08:45:00Z',
      read: false
    },
    unreadCount: 1
  },
  {
    id: '5',
    participants: [mockAthletes[0], mockAthletes[3]], // Neeraj (primary profile) as mentor
    lastMessage: {
      id: '5',
      senderId: mockAthletes[3].id,
      senderName: mockAthletes[3].name,
      content: 'Maintain consistency in strength sessions and keep the technique clean. Small improvements add up—proud of your progress!',
      timestamp: '2024-01-17T06:30:00Z',
      read: true
    },
    unreadCount: 0
  }
];

// API Functions (Placeholder)
export const api = {
  async fetchAthlete(id: string): Promise<Athlete | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAthletes.find(athlete => athlete.id === id) || null;
  },

  async fetchAthletes(): Promise<Athlete[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAthletes;
  },

  async fetchLeaderboard(sport?: string, region?: string): Promise<Athlete[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    let filtered = [...mockAthletes];
    
    if (sport && sport !== 'All Sports') {
      filtered = filtered.filter(athlete => athlete.sport === sport);
    }
    
    if (region && region !== 'All Regions') {
      filtered = filtered.filter(athlete => athlete.location.includes(region));
    }
    
    return filtered.sort((a, b) => {
      const aScore = a.testResults.reduce((sum, test) => sum + test.percentile, 0);
      const bScore = b.testResults.reduce((sum, test) => sum + test.percentile, 0);
      return bScore - aScore;
    });
  },

  async fetchOpportunities(): Promise<Opportunity[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockOpportunities;
  },

  async fetchTests(): Promise<Test[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockTests;
  },

  async fetchTest(id: string): Promise<Test | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTests.find(test => test.id === id) || null;
  },

  async fetchConversations(): Promise<Conversation[]> {
    await new Promise(resolve => setTimeout(resolve, 250));
    return mockConversations;
  },

  async login(email: string, password: string): Promise<{ success: boolean; user?: Athlete }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock authentication - in real app, this would validate against backend
    if (email && password) {
      return { success: true, user: mockAthletes[0] };
    }
    return { success: false };
  }
};