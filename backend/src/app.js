import express from 'express';
import cors from 'cors';

import router from './routes/employees.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	console.log(`Request received: ${req.method} ${req.url}`);
	next();
});

app.use('/employees', router);

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
