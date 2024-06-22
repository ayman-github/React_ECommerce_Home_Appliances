const allowedOrigins: string[] = [
  'http://127.0.0.1:5500',
  'http://localhost:3500',
  'http://localhost:3000',
  'http://localhost:5173',
];

const corsOptions = {
  origin: (origin: string, callback: any) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

export = corsOptions;
