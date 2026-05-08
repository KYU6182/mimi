# mimi MVP

Z世代向けWEB雑誌・モデルコミュニティ・推し活メディア「mimi」のNext.js MVPです。

## Setup

```bash
npm install
npx prisma migrate dev
npm run seed
npm run dev
```

この環境ではnpmの既存キャッシュに権限問題があったため、検証時は `npm_config_cache=.npm-cache` を付けて実行しました。

## Sample Accounts

- model@example.com / password
- fan@example.com / password
- admin@example.com / password

## Pages

- `/`
- `/girls`
- `/girls/yuina`
- `/ranking`
- `/magazine`
- `/works`
- `/local/fukuoka`
- `/line`
- `/mypage`
- `/admin`
