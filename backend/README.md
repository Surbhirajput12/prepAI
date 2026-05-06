# AI Resume Interview Server (MVC)

This backend supports:

- Signup/login and Google OAuth login
- Auth-gated dashboard
- Resume upload + profile extraction
- Interview prep plan from tech stacks/roles/experience
- Live interview flow with Socket.IO
- Transcript + seniority-based interview report
- MongoDB persistence with Mongoose

## 1) Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## 2) Main API

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/oauth/google` (body: `idToken`)
- `GET /api/auth/me`
- `GET /api/dashboard`
- `POST /api/resume/upload` (multipart field: `resume`)
- `GET /api/resume/me`
- `GET /api/prep/plan`
- `POST /api/interview/start`
- `POST /api/interview/:id/answer`
- `POST /api/interview/:id/end`
- `GET /api/interview/:id/report`

All protected routes require:

`Authorization: Bearer <token>`

## 3) Live interview socket events

Client connects with:

`auth: { token: "Bearer <token>" }`

Events:

- emit `interview:start` -> receive `interview:started`
- emit `interview:answer` -> receive `interview:question`
- emit `interview:end` -> receive `interview:report`

## 4) Notes

- Data is stored in MongoDB (`MONGODB_URI` from `.env`).
- Resume text auto-parsing is strongest for `.txt`; for pdf/doc/docx you can pass `resumeText` and override profile fields while uploading.
