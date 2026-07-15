import React from "react";

// Swizzled site footer — mirrors the parent site (davidwindham.com) parts/footer-home.html.
// The dw-* icon sprite is inlined; styling lives in src/css/custom.css (scoped to #dw-footer).
// Raw HTML via dangerouslySetInnerHTML so class/SVG attributes stay verbatim.
const HTML = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
<symbol id="dw-file-lines" viewBox="0 0 384 512">
<path fill="currentColor" d="M0 64C0 28.7 28.7 0 64 0L213.5 0c17 0 33.3 6.7 45.3 18.7L365.3 125.3c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm208-5.5l0 93.5c0 13.3 10.7 24 24 24L325.5 176 208 58.5zM120 256c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0z"/>
</symbol>
<symbol id="dw-box-archive" viewBox="0 0 512 512">
<path fill="currentColor" d="M434.1 64.8c-130.6-3.6-241 4.7-364.9 .3-4.6-.1-9.6 4-9.9 9.7-1 18.6-1.9 36.5-1.2 51.8 134.8 3.2 235.6 2.5 377.1 2.2 8.5 .5 7.8-10.8 7.8-14.4 0-9.6-.6-26.4-1.4-42.5-.2-3.8-3.3-7.1-7.5-7.1zM234.8 1.4c57-2.2 133.3-1.7 200.3-.6 37.7 .6 68.7 30.3 70.4 68.2 1.9 41.1 8 85.4-28.4 110.2 8.5 101.1 6.1 203 .3 303.4-6.1 44.1-61.4 25.4-91.8 29.7-27 .5-59 1.1-86-1.4-80.3-3.3-158 4.7-238.3 1-16.5-.5-29.9-13.6-30.9-30.1-2-55.6-1-112.6 1.9-167.2l.1-.5c3.2-38.8 1.2-82.8 1.6-128.4-46.3-14.6-41.8-74.4-38.5-114.5 2.1-39.2 35.1-71.2 75.5-70.1 55.3 1.4 110.1 2.4 163.9 .4l0 0zM314.3 193c-72 0-144.1-.2-216.4-1.7 2 91.7-5.4 169.4-4.6 257.2 96.5-1.2 193.1-2.5 289.1-.2 11.1-.2 22.4-.4 33.6-.4l.6-7.1c0-24.9 .4-49.4 .9-73.5 1.1-59.4 2.1-116.8-3.3-174.5-38.4 .1-84.6 .2-99.8 .2zm20.5 128l-58.2 2.5c-36.6-5.2-123.3 24.2-124.5-33.9 6.1-43.8 57.1-24.2 88.3-29.2 11-.4 22.8-.9 34.2-.9l57.6-2.4c41.8-1.6 44.5 62 2.7 63.9z"/>
</symbol>
<symbol id="dw-microphone" viewBox="0 0 384 512">
<path fill="currentColor" d="M192 0C139 0 96 43 96 96l0 128c0 53 43 96 96 96s96-43 96-96l0-128c0-53-43-96-96-96zM48 184c0-13.3-10.7-24-24-24S0 170.7 0 184l0 40c0 97.9 73.3 178.7 168 190.5l0 49.5-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-49.5c94.7-11.8 168-92.6 168-190.5l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 79.5-64.5 144-144 144S48 303.5 48 224l0-40z"/>
</symbol>
<symbol id="dw-comment" viewBox="0 0 512 512">
<path fill="currentColor" d="M302.4 65.5c-119.1-19.8-273.3 80.9-230.2 209.5 7 30.2 40.5 59 37.5 92.2-2.2 16.4-5.6 45.4-9.7 63.7 32.2-12 65.3-32.6 101.8-32.6 72.1 9.3 131.6 1.3 189.6-48 24.6-18.7 47.4-46.8 54.1-71.5 11.8-80.7-45.5-207.5-143-213.3zM145.1 26.7c92.1-39.2 203.3-43.2 278.3 26.5 32 32.2 56.5 67.7 70.8 113.5 10.8 34 25.8 81.5 12.9 129-43.2 124.8-185.1 187.5-310.2 166.7-35.4 9.7-69.8 28-105.2 41-30.8 11.5-66.9-12.4-61.6-49.2 5.6-30.9 12-58.9 15.2-89.8-91.1-133.7-34.1-269.5 99.6-337.6l0 0z"/>
</symbol>
<symbol id="dw-code" viewBox="0 0 576 512">
<path fill="currentColor" d="M360.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm64.6 136.1c-12.5 12.5-12.5 32.8 0 45.3l73.4 73.4-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0zm-274.7 0c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 150.6 182.6c12.5-12.5 12.5-32.8 0-45.3z"/>
</symbol>
<symbol id="dw-envelope" viewBox="0 0 512 512">
<path fill="currentColor" d="M448.7 32c-68.7 0-137.1 4.3-205.8 3.9-11.1-.1-22.4-.1-33.7-.2-45.2-.3-91.8-.7-139.4 .5-35.2 .9-60.9 29.4-63 61.5-7.5 109.9-7.4 215.5 2.9 324.3 3.1 32.9 30.7 57.9 63.7 57.9l370.3 0c35.3 0 64-28.7 64-64l0-124c0-66.8 7.2-133.5 4.2-200.3-1.5-34.6-30.5-59.6-63.1-59.6zM242.5 99.9c55.9 .3 111.8 0 168-3.9l37.4 0c.6 14.3 .7 28.6 .5 43.1-20 12.8-39.8 26.4-60.6 37.9-45 24.8-84.2 58.4-128.7 83.9-45-32.6-93-61.3-139.4-91.7-16.9-11.1-33.7-24.6-51.9-33.6 .6-7.2-1.5-30.2 3.5-35.2 .1-.1 .2-.1 .2-.1 46.5-1.1 91.7-.8 136.8-.5 11.4 .1 22.9 .2 34.3 .2zM64.5 209.5c6.1 4 12.9 8.4 20.1 13.1 26.9 17.6 58.9 38.8 80 53.1 24 16.3 50.6 38.7 78.1 50.1 2.5 1 6.4 2.4 11.2 3 4.7 .6 12.5 .6 20.6-3.6 51-26.1 94.1-64.7 144.2-92.2 5.6-3.1 16.2-9.6 27-16.4-1.1 24.7-2.1 50-2.1 75.3l0 124-370.3 0-8.8-92.5 0-114z"/>
</symbol>
<symbol id="dw-pen-to-square" viewBox="0 0 512 512">
<path fill="currentColor" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L368 46.1 465.9 144 490.3 119.6c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L432 177.9 334.1 80 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
</symbol>
<symbol id="dw-paper-plane" viewBox="0 0 576 512">
<path fill="currentColor" d="M536.4-26.3c9.8-3.5 20.6-1 28 6.3s9.8 18.2 6.3 28l-178 496.9c-5 13.9-18.1 23.1-32.8 23.1-14.2 0-27-8.6-32.3-21.7l-64.2-158c-4.5-11-2.5-23.6 5.2-32.6l94.5-112.4c5.1-6.1 4.7-15-.9-20.6s-14.6-6-20.6-.9L229.2 276.1c-9.1 7.6-21.6 9.6-32.6 5.2L38.1 216.8c-13.1-5.3-21.7-18.1-21.7-32.3 0-14.7 9.2-27.8 23.1-32.8l496.9-178z"/>
</symbol>
<symbol id="dw-house" viewBox="0 0 512 512">
<path fill="currentColor" d="M283.4-8.8c-40.8-23.5-84 15.9-113.5 40.1-10.9 9.2-21.5 17.3-32.8 25.4-19 14-38.5 28.5-58.7 42.5-30.2 23.6-79.3 44.2-78.2 89.1l0 262.7c0 30.4 21.6 57.5 52.9 62.5 91.9 10.1 184.9 4.9 276.9 5.1 29.6 0 88.8-4.3 123.5-7 33.3-2.6 58.7-30.3 58.8-63.4 .2-46.5 .5-132.1 .8-146.9 .8-29.9-.2-88.6-.7-114.8-.3-17.6-7.9-34.4-21.3-46.2-18.6-16.7-43.6-37.4-65-50.1-50.1-32.1-89.4-72.9-142.8-98.8l0 0zM250.5 50.6c.6-.4 2-1.1 4.3-2.2 50 24.5 92.1 68.2 139.4 97.1 19.2 11.8 34.2 24.4 54.3 42.3 2 88-.3 154-.2 259.9-21.2 1.6-49.6 3.7-74.8 5.1-9.3-77.4-20.9-216.7-132.7-196.4-91.7 30.2-82.6 126.1-85.3 197.9-33.4-1.4-56 2-91.3-4l0-261.8c61.7-44.2 125.9-92 186.2-137.9l0 0zM219.5 455.8c.9-42-3.9-126 37.7-137.4 7-1.9 11.7-.4 17.4 5.4 26.3 34.1 28.5 88.4 34.8 130.8-11.9 .1-23.5 .3-35 .5-18.5 .4-36.7 .7-54.9 .6z"/>
</symbol>
<symbol id="dw-paintbrush" viewBox="0 0 576 512">
<path fill="currentColor" d="M480.5 10.3L259.1 158c-29.1 19.4-47.6 50.9-50.6 85.3 62.3 12.8 111.4 61.9 124.3 124.3 34.5-3 65.9-21.5 85.3-50.6L565.7 95.5c6.7-10.1 10.3-21.9 10.3-34.1 0-33.9-27.5-61.4-61.4-61.4-12.1 0-24 3.6-34.1 10.3zM288 400c0-61.9-50.1-112-112-112S64 338.1 64 400c0 3.9 .2 7.8 .6 11.6 1.8 17.5-10.2 36.4-27.8 36.4L32 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0c61.9 0 112-50.1 112-112z"/>
</symbol>
<symbol id="dw-credit-card" viewBox="0 0 512 512">
<path fill="currentColor" d="M0 128l0 32 512 0 0-32c0-35.3-28.7-64-64-64L64 64C28.7 64 0 92.7 0 128zm0 80L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-176-512 0zM64 360c0-13.3 10.7-24 24-24l48 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-48 0c-13.3 0-24-10.7-24-24zm144 0c0-13.3 10.7-24 24-24l64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0c-13.3 0-24-10.7-24-24z"/>
</symbol>
<symbol id="dw-camera-retro" viewBox="0 0 512 512">
<path fill="currentColor" d="M0 416l0-208 136.2 0c13.5-20.2 32-36.8 53.7-48L0 160 0 125.7c0-35.3 28.7-64 64-64l.1 0C65.3 45.1 79.1 32 96 32l32 0c16.9 0 30.7 13.1 31.9 29.7l32.1 0 51.2-23.8c8.4-3.9 17.6-6 26.9-6L448 32c35.3 0 64 28.7 64 64l0 64-190 0c21.7 11.2 40.2 27.8 53.7 48l136.2 0 0 208c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64zM256 192a96.1 96.1 0 1 0 0 192.1 96.1 96.1 0 1 0 0-192.1z"/>
</symbol>
<symbol id="dw-sitemap" viewBox="0 0 512 512">
<path fill="currentColor" d="M192 64c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-8 0 0 64 120 0c39.8 0 72 32.2 72 72l0 56 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-56c0-13.3-10.7-24-24-24l-120 0 0 80 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-80-120 0c-13.3 0-24 10.7-24 24l0 56 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-56c0-39.8 32.2-72 72-72l120 0 0-64-8 0c-17.7 0-32-14.3-32-32l0-64z"/>
</symbol>
<symbol id="dw-gauge" viewBox="0 0 512 512">
<path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm320 96c0-26.9-16.5-49.9-40-59.3L280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 172.7c-23.5 9.5-40 32.5-40 59.3 0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>
</symbol>
<symbol id="dw-flask" viewBox="0 0 448 512">
<path fill="currentColor" d="M288 0L128 0C110.3 0 96 14.3 96 32s14.3 32 32 32L128 215.5 7.5 426.3C2.6 435 0 444.7 0 454.7 0 486.4 25.6 512 57.3 512l333.4 0c31.6 0 57.3-25.6 57.3-57.3 0-10-2.6-19.8-7.5-28.4L320 215.5 320 64c17.7 0 32-14.3 32-32S337.7 0 320 0L288 0zM192 215.5l0-151.5 64 0 0 151.5c0 11.1 2.9 22.1 8.4 31.8l41.6 72.7-164 0 41.6-72.7c5.5-9.7 8.4-20.6 8.4-31.8z"/>
</symbol>
<symbol id="dw-book" viewBox="0 0 448 512">
<path fill="currentColor" d="M384 512L96 512c-53 0-96-43-96-96L0 96C0 43 43 0 96 0L400 0c26.5 0 48 21.5 48 48l0 288c0 20.9-13.4 38.7-32 45.3l0 66.7c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0zM96 384c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0 0-64-256 0zm32-232c0 13.3 10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0c-13.3 0-24 10.7-24 24zm24 72c-13.3 0-24 10.7-24 24s10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0z"/>
</symbol>
<symbol id="dw-briefcase" viewBox="0 0 16 16" fill="currentColor"><path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"/></symbol>
<symbol id="dw-wikipedia" viewBox="0 0 16 16" fill="currentColor"><path d="M8.835 3.003c.828-.006 2.688 0 2.688 0l.033.03v.288c0 .08-.045.12-.133.12-.433.02-.522.063-.68.29-.087.126-.258.393-.435.694l-1.52 2.843-.043.089 1.858 3.801.113.031 2.926-6.946c.102-.28.086-.478-.044-.595-.132-.114-.224-.18-.563-.195l-.275-.014a.161.161 0 0 1-.096-.035.1.1 0 0 1-.046-.084v-.289l.042-.03h3.306l.034.03v.29c0 .078-.045.117-.133.117-.433.02-.754.113-.962.281a1.64 1.64 0 0 0-.488.704s-2.691 6.16-3.612 8.208c-.353.672-.7.61-1.004-.019A224.05 224.05 0 0 1 8.044 8.81c-.623 1.285-1.475 3.026-1.898 3.81-.411.715-.75.622-1.02.019-.45-1.065-1.131-2.519-1.817-3.982-.735-1.569-1.475-3.149-1.943-4.272-.167-.4-.293-.657-.412-.759-.12-.1-.368-.16-.746-.18C.069 3.429 0 3.395 0 3.341v-.303l.034-.03c.615-.003 3.594 0 3.594 0l.034.03v.288c0 .08-.05.118-.15.118l-.375.016c-.322.013-.483.11-.483.288 0 .083.034.217.109.4.72 1.753 3.207 6.998 3.207 6.998l.091.023 1.603-3.197-.32-.71L6.24 5.095s-.213-.433-.286-.577l-.098-.196c-.387-.77-.411-.82-.865-.88-.137-.017-.208-.035-.208-.102v-.304l.041-.03h2.853l.075.024v.303c0 .069-.05.104-.15.104l-.206.03c-.523.04-.438.254-.09.946l1.057 2.163 1.17-2.332c.195-.427.155-.534.074-.633-.046-.055-.202-.144-.54-.158l-.133-.015a.159.159 0 0 1-.096-.034.099.099 0 0 1-.045-.085v-.288l.041-.03Z"/></symbol>
<symbol id="dw-github" viewBox="0 0 512 512">
<path fill="currentColor" d="M216.5 362.5c-66-8-112.5-55.5-112.5-117 0-25 9-52 24-70-6.5-16.5-5.5-51.5 2-66 20-2.5 47 8 63 22.5 19-6 39-9 63.5-9s44.5 3 62.5 8.5c15.5-14 43-24.5 63-22 7 13.5 8 48.5 1.5 65.5 16 19 24.5 44.5 24.5 70.5 0 61.5-46.5 108-113.5 116.5 17 11 28.5 35 28.5 62.5l0 52C323 491.5 335.5 500 350.5 494 441 459.5 512 369 512 257 512 115.5 397 0 255.5 0S0 115.5 0 257c0 111 70.5 203 165.5 237.5 13.5 5 26.5-4 26.5-17.5l0-40c-7 3-16 5-24 5-33 0-52.5-18-66.5-51.5-5.5-13.5-11.5-21.5-23-23-6-.5-8-3-8-6 0-6 10-10.5 20-10.5 14.5 0 27 9 40 27.5 10 14.5 20.5 21 33 21s20.5-4.5 32-16c8.5-8.5 15-16 21-21z"/>
</symbol>
<symbol id="dw-mastodon" viewBox="0 0 448 512">
<path fill="currentColor" d="M433 179.1c0-97.2-63.7-125.7-63.7-125.7-62.5-28.7-228.6-28.4-290.5 0 0 0-63.7 28.5-63.7 125.7 0 115.7-6.6 259.4 105.6 289.1 40.5 10.7 75.3 13 103.3 11.4 50.8-2.8 79.3-18.1 79.3-18.1l-1.7-36.9s-36.3 11.4-77.1 10.1c-40.4-1.4-83-4.4-89.6-54-.6-4.6-.9-9.3-.9-13.9 85.6 20.9 158.7 9.1 178.7 6.7 56.1-6.7 105-41.3 111.2-72.9 9.8-49.8 9-121.5 9-121.5zM357.9 304.3l-46.6 0 0-114.2c0-49.7-64-51.6-64 6.9l0 62.5-46.3 0 0-62.5c0-58.5-64-56.6-64-6.9l0 114.2-46.7 0c0-122.1-5.2-147.9 18.4-175 25.9-28.9 79.8-30.8 103.8 6.1l11.6 19.5 11.6-19.5c24.1-37.1 78.1-34.8 103.8-6.1 23.7 27.3 18.4 53 18.4 175l0 0z"/>
</symbol>
<symbol id="dw-stack-overflow" viewBox="0 0 16 16" fill="currentColor"><path d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282h9.984z"/>
  <path d="M3.857 13.145h7.137v-1.428H3.857v1.428zM10.254 0 9.108.852l4.26 5.727 1.146-.852L10.254 0zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013-.603 1.294zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468-.294 1.397z"/></symbol>
<symbol id="dw-facebook" viewBox="0 0 512 512">
<path fill="currentColor" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5l0-170.3-52.8 0 0-78.2 52.8 0 0-33.7c0-87.1 39.4-127.5 125-127.5 16.2 0 44.2 3.2 55.7 6.4l0 70.8c-6-.6-16.5-1-29.6-1-42 0-58.2 15.9-58.2 57.2l0 27.8 83.6 0-14.4 78.2-69.3 0 0 175.9C413.8 494.8 512 386.9 512 256z"/>
</symbol>
<symbol id="dw-bluesky" viewBox="0 0 576 512">
<path fill="currentColor" d="M407.8 294.7c-3.3-.4-6.7-.8-10-1.3 3.4 .4 6.7 .9 10 1.3zM288 227.1C261.9 176.4 190.9 81.9 124.9 35.3 61.6-9.4 37.5-1.7 21.6 5.5 3.3 13.8 0 41.9 0 58.4S9.1 194 15 213.9c19.5 65.7 89.1 87.9 153.2 80.7 3.3-.5 6.6-.9 10-1.4-3.3 .5-6.6 1-10 1.4-93.9 14-177.3 48.2-67.9 169.9 120.3 124.6 164.8-26.7 187.7-103.4 22.9 76.7 49.2 222.5 185.6 103.4 102.4-103.4 28.1-156-65.8-169.9-3.3-.4-6.7-.8-10-1.3 3.4 .4 6.7 .9 10 1.3 64.1 7.1 133.6-15.1 153.2-80.7 5.9-19.9 15-138.9 15-155.5s-3.3-44.7-21.6-52.9c-15.8-7.1-40-14.9-103.2 29.8-66.1 46.6-137.1 141.1-163.2 191.8z"/>
</symbol>
<symbol id="dw-reddit" viewBox="0 0 512 512">
<path fill="currentColor" d="M0 256C0 114.6 114.6 0 256 0S512 114.6 512 256 397.4 512 256 512L37.1 512c-13.7 0-20.5-16.5-10.9-26.2L75 437C28.7 390.7 0 326.7 0 256zM349.6 153.6c23.6 0 42.7-19.1 42.7-42.7s-19.1-42.7-42.7-42.7c-20.6 0-37.8 14.6-41.8 34-34.5 3.7-61.4 33-61.4 68.4l0 .2c-37.5 1.6-71.8 12.3-99 29.1-10.1-7.8-22.8-12.5-36.5-12.5-33 0-59.8 26.8-59.8 59.8 0 24 14.1 44.6 34.4 54.1 2 69.4 77.6 125.2 170.6 125.2s168.7-55.9 170.6-125.3c20.2-9.6 34.1-30.2 34.1-54 0-33-26.8-59.8-59.8-59.8-13.7 0-26.3 4.6-36.4 12.4-27.4-17-62.1-27.7-100-29.1l0-.2c0-25.4 18.9-46.5 43.4-49.9 4.4 18.8 21.3 32.8 41.5 32.8l.1 .2zM177.1 246.9c16.7 0 29.5 17.6 28.5 39.3s-13.5 29.6-30.3 29.6-31.4-8.8-30.4-30.5 15.4-38.3 32.1-38.3l.1-.1zm190.1 38.3c1 21.7-13.7 30.5-30.4 30.5s-29.3-7.9-30.3-29.6 11.8-39.3 28.5-39.3 31.2 16.6 32.1 38.3l.1 .1zm-48.1 56.7c-10.3 24.6-34.6 41.9-63 41.9s-52.7-17.3-63-41.9c-1.2-2.9 .8-6.2 3.9-6.5 18.4-1.9 38.3-2.9 59.1-2.9s40.7 1 59.1 2.9c3.1 .3 5.1 3.6 3.9 6.5z"/>
</symbol>
<symbol id="dw-linkedin" viewBox="0 0 16 16" fill="currentColor"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></symbol>
</svg>
<div id="dw-footer" class="container-fluid footer-home dw-footer">
	<div class="container">
		<div class="row">
			<div class="col-lg-5 col-md-6">
				<div class="br-widget">
					<h5>David Windham</h5>
					<address class="mt-3">
						<a href="https://www.google.com/maps/place/David+A.+Windham/@34.1765211,-82.2053464,283m/data=!3m1!1e3!4m15!1m8!3m7!1s0x88f801f9e630a345:0xe922490e1a1e4b7!2s102+Glenridge+Cir,+Greenwood,+SC+29646!3b1!8m2!3d34.1765755!4d-82.2046031!16s%2Fg%2F11c2bblj4m!3m5!1s0x88f801f9e8809783:0x5c848caa89afc24b!8m2!3d34.176529!4d-82.204683!16s%2Fg%2F11c1vh_2d0">102 Glenridge Circle</a><br />
						<a href="https://www.google.com/maps/place/David+A.+Windham/@34.1765211,-82.2053464,283m/data=!3m1!1e3!4m15!1m8!3m7!1s0x88f801f9e630a345:0xe922490e1a1e4b7!2s102+Glenridge+Cir,+Greenwood,+SC+29646!3b1!8m2!3d34.1765755!4d-82.2046031!16s%2Fg%2F11c2bblj4m!3m5!1s0x88f801f9e8809783:0x5c848caa89afc24b!8m2!3d34.176529!4d-82.204683!16s%2Fg%2F11c1vh_2d0">Greenwood, South Carolina USA</a><br />
						<a href="mailto:david@davidawindham.com">david@davidawindham.com</a><br />
						<a href="tel:8037123283">+1-803-712-3283</a>
					</address>
				</div>
			</div>
			<div class="col-lg-6 col-md-6 offset-lg-1 mt-5 mt-md-0">
				<div class="br-widget">
					<div class="row">
						<div class="col-4">
							<ul class="footer-links">
								<li><a href="/about"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-file-lines"></use></svg> About</a></li>
								<li><a href="/desk/archive" title="Archive"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-box-archive"></use></svg> Archive</a></li>
								<li><a href="/studio/music/"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-microphone"></use></svg> Audio</a></li>
								<li><a href="https://davidwindham.com/rtc"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-comment"></use></svg> Chat</a></li>
								<li><a href="http://chess.davidwindham.com"><span class="chess-html">&#9814;</span> Chess</a></li>
								<li><a href="http://code.davidawindham.com"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-code"></use></svg> Code</a></li>
								<li><a href="/contact"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-envelope"></use></svg> Contact</a></li>
							</ul>
						</div>
						<div class="col-4">
							<ul class="footer-links">
								<li><a href="/desk"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-pen-to-square"></use></svg> Desk</a></li>
								<li><a href="/mail/" title="Newsletter"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-paper-plane"></use></svg> Email</a></li>
								<li><a href="/contact/guests" title="Guestbook"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-pen-to-square"></use></svg> Guests</a></li>
								<li><a href="/"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-house"></use></svg> Home</a></li>
								<li><a href="/studio/art/" title="Art"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-paintbrush"></use></svg> Paint</a></li>
								<li><a href="/pay"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-credit-card"></use></svg> Pay</a></li>
								<li><a href="http://photo.davidwindham.com" title="Photo"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-camera-retro"></use></svg> Photo</a></li>
							</ul>
						</div>
						<div class="col-4">
							<ul class="footer-links">
								<li><a href="http://radio.davidawindham.com"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-microphone"></use></svg> Radio</a></li>
								<li><a href="/shop"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-credit-card"></use></svg> Shop</a></li>
								<li><a href="/sitemap"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-sitemap"></use></svg> Sitemap</a></li>
								<li><a href="/about/analytics/" title="analytics"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-gauge"></use></svg> Stats</a></li>
								<li><a href="/studio"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-flask"></use></svg> Studio</a></li>
								<li><a href="/til/" title="Today I Learned"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-book"></use></svg> TIL</a></li>
								<li><a href="/work"><svg class="dw-icon" aria-hidden="true" focusable="false"><use href="#dw-briefcase"></use></svg> Work</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="footer-end">
		<div class="container">
			<div class="row align-items-end">
				<div class="col-md-6 text-md-start">
					<small class="copyright">&copy; 2004-2026</small>
				</div>
				<div class="col-md-6 text-md-end">
					<p class="gaegu mb-n1">I'm not really active on most of these:</p>
					<ul class="footer-links footer-social">
						<li><a href="https://en.wikipedia.org/wiki/User:Windhamdavid" class="wikipedia" rel="me"><svg class="dw-icon dw-icon-2x" role="img" aria-label="Wikipedia"><use href="#dw-wikipedia"></use></svg></a></li>
						<li><a href="https://github.com/windhamdavid" class="github" rel="me"><svg class="dw-icon dw-icon-2x" role="img" aria-label="GitHub"><use href="#dw-github"></use></svg></a></li>
						<li><a href="https://mastodon.social/@windhamdavid" class="mastodon" rel="me"><svg class="dw-icon dw-icon-2x" role="img" aria-label="Mastodon"><use href="#dw-mastodon"></use></svg></a></li>
						<li><a href="https://stackexchange.com/users/521983/david-windham" class="stackoverflow"><svg class="dw-icon dw-icon-2x" role="img" aria-label="Stack Exchange"><use href="#dw-stack-overflow"></use></svg></a></li>
						<li><a href="https://www.facebook.com/windhamdavid" class="facebook"><svg class="dw-icon dw-icon-2x" role="img" aria-label="Facebook"><use href="#dw-facebook"></use></svg></a></li>
						<li><a href="https://bsky.app/profile/davidwindham.com" class="twitter" rel="me"><svg class="dw-icon dw-icon-2x" role="img" aria-label="Bluesky"><use href="#dw-bluesky"></use></svg></a></li>
						<li><a href="https://www.reddit.com/user/windhamdavid" class="reddit"><svg class="dw-icon dw-icon-2x" role="img" aria-label="Reddit"><use href="#dw-reddit"></use></svg></a></li>
						<li><a href="https://www.linkedin.com/in/windhamdavid" class="linkedin" rel="me"><svg class="dw-icon dw-icon-2x" role="img" aria-label="LinkedIn"><use href="#dw-linkedin"></use></svg></a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>`;

export default function Footer() {
  return <div className="dw-footer-wrap" dangerouslySetInnerHTML={{__html: HTML}} />;
}
