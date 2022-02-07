
<h2><strong>Simple-Forum</strong>  -> <a href='https://www.simple-forum.site/' target="_black">🔗 Link</a></h2>
<br>
Simple Forum은 Next.js로 제작한 SSR 방식의 회원 전용 게시판 웹사이트입니다. 이전 텍스트 작성만 가능했던 CSR 방식의 Simple React Board를 개편하여 회원가입/로그인, 위지윅 텍스트 에디터, 이미지 업로드, 무한 스크롤 기능을 추가하였습니다.

<br/><br/>

<ul><li>Simpe Forum -> 🔗 <strong><a href="https://github.com/junheeleeme/simple-forum"><span style="color: #0070ff" data-raw-html="span">Github</span></a></strong></li><li>Simple React Board -> 🔗 <strong><a href="https://github.com/junheeleeme/Simple-React-Board"><span style="color: #0070ff" data-raw-html="span">Github</span></a></strong></li></ul>


<br>
<h3><strong><span style="color: rgb(38, 38, 38); font-family: -apple-system, 'system-ui', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;" data-raw-html="span">📌</span> 개발 기간</strong></h3>
<ul><li>22.01.13 ~ 22.02.06</li></ul>


<br>
<h3><strong><span style="color: rgb(38, 38, 38); font-family: -apple-system, 'system-ui', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;" data-raw-html="span">📌</span> 사용한 스킬 및 라이브러리</strong></h3>
<ul><li>React(Next.js), TailWind CSS, MongoDB, Firebase, Next-Auth, Toast UI Editor, AWS EC2 Linux</li></ul>


<br>
<img src="https://firebasestorage.googleapis.com/v0/b/simple-forum-f9e1c.appspot.com/o/post_images%2Ffpbw2ej9_202211722121253.png?alt=media&amp;amp;token=d76dd6ec-ad8d-4e56-b81f-ae12572cdfab" alt="image.png">

프론트 단은 Next.js, TailWind CSS로 구현됐으며, 로그인 인증은 Next.js/서버리스(Server less)에 유연한 Next-Auth 라이브러리와 bCrypt 암호화/reCaptcha를 사용해 회원 유저 검증을 진행합니다.

<br/>

서버리스<span data-raw-html="span" class="s1"> </span>환경에서<span data-raw-html="span" class="s1"> DB </span>접근은<span data-raw-html="span" class="s1"> </span>클라이언트<span data-raw-html="span" class="s1"> </span>요청으로<span data-raw-html="span" class="s1"> Next API</span>에서만<span data-raw-html="span" class="s1"> </span>가능하도록<span data-raw-html="span" class="s1"> </span>분리해<span data-raw-html="span" class="s1"> </span>놓았으며<span data-raw-html="span" class="s1">, DB</span>는<span data-raw-html="span" class="s1"> </span>자바스크립트와<span data-raw-html="span" class="s1"> </span>호환성이<span data-raw-html="span" class="s1"> </span>좋은<span data-raw-html="span" class="s1"> MongoDB</span>와<span data-raw-html="span" class="s1"> </span>이미지<span data-raw-html="span" class="s1"> </span>서버로<span data-raw-html="span" class="s1"> Firebase </span>스토리지를<span data-raw-html="span" class="s1"> </span>사용하고<span data-raw-html="span" class="s1"> </span>있습니다<span data-raw-html="span" class="s1">.</span>
<br><br>
글 작성시 사용하는 위지윅(Wysiwyg) 에디터의 경우 Toast UI Editor를 적용했으며, 마지막 배포<span data-raw-html="span" class="s1">는 Vercel 대신 AWS EC2 </span>리눅스<span data-raw-html="span" class="s1"> </span>서버에서<span data-raw-html="span" class="s1"> PM2 </span>프로세서<span data-raw-html="span" class="s1"> </span>매니저를<span data-raw-html="span" class="s1"> </span>통해<span data-raw-html="span" class="s1"> </span>배포되었습니다<span data-raw-html="span" class="s1">.</span>

<br>
<h3><strong><span style="color: rgb(38, 38, 38); font-family: -apple-system, 'system-ui', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;" data-raw-html="span">📌</span> 개발하면서 작성한 포스팅</strong></h3>
<ul><li><strong><a href="https://juni-official.tistory.com/225"><span style="color: #2f80ff" data-raw-html="span">[React] Next.js + Toast UI Editor 사용</span></a></strong></li><li><strong><a href="https://juni-official.tistory.com/226"><span style="color: #2f80ff" data-raw-html="span">[React] 무한 스크롤(Infinite Scroll) 구현</span></a></strong></li><li><strong><a href="https://juni-official.tistory.com/227"><span style="color: #2f80ff" data-raw-html="span">Firebase Storage 사용하지 않는 이미지 삭제하기</span></a></strong></li></ul>