# 玄学排盘助手（静态网页）

主功能：六爻排盘（手机优先），含周易卦名、卦辞、爻辞、专业盘字段和一键复制。  
辅助功能：八字排盘（本地浏览器存储）。

## 本地使用

直接双击 `index.html` 打开即可。

## 免费托管（推荐：GitHub Pages）

这个项目是纯静态网页，无需服务器、无数据库，可免费托管在 GitHub Pages。

### 方式一：网页上传（最简单）

1. 在 GitHub 新建一个公开仓库（例如 `suan`）。
2. 进入仓库页面，点击 `Add file` -> `Upload files`。
3. 把以下文件上传到仓库根目录：
   - `index.html`
   - `styles.css`
   - `app.js`
4. 打开仓库 `Settings` -> `Pages`：
   - Source 选择 `Deploy from a branch`
   - Branch 选择 `main`，目录选 `/ (root)`
5. 保存后等待 1-3 分钟，访问页面地址：
   - `https://你的用户名.github.io/仓库名/`

### 方式二：Git 命令上传（你本机有 git 时）

```bash
git init
git add .
git commit -m "init site"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

然后按“方式一”的第 4 步开启 Pages。

## 说明

- 当前没有后端，不占服务器存储空间。
- 八字历史记录只保存在用户自己的浏览器 `localStorage`。
- 六爻主要为前端即时计算，部署后可直接手机访问。
