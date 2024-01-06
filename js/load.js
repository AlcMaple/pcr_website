/** 禁止文本选中 */
document.addEventListener('selectstart', function (el) {
    el.preventDefault();
})

/**获取需要操作的元素 */
var canvas = document.querySelector('canvas');
var firing = document.querySelector('.box .loading .firing')
var firing2 = document.querySelector('.box .firing2')
var firing2_main = document.querySelector('.box  .firing2 .firing2-main')
var loading = document.querySelector('#loading');

// 设置canvas的宽度为1200px
canvas.width = 1200;

// 创建video元素
let video = document.createElement('video');
video.src = '../sources/movie/Lost Princes.mp4';
video.loop = true;
// 隐藏视频元素
video.style.display = 'none';
// 添加到body中
document.body.appendChild(video);

let aspectRatio;
// 当视频加载完毕后，计算canvas的高度
video.addEventListener('loadedmetadata', function () {
    aspectRatio = video.videoWidth / video.videoHeight;
    canvas.height = canvas.width / aspectRatio;
    firing2.style.height = canvas.height + 'px';

    // 调整firing2元素的位置
    firing2_main.style.marginTop = (canvas.height - 370) + 'px';
})

function start() {
    firing.style.display = 'none';

    // 检查视频是否正在播放或是否已结束
    if (video.paused || video.ended) {
        // 显示"加载中"的提示
        showLoading();
        // 尝试播放视频
        video.play();
    } else {
        // 如果视频已经在播放，则调用drawVideoTocanvas函数
        drawVideoTocanvas(video, canvas);
    }

    video.play();
    canvas.removeEventListener('click', start);
}
canvas.addEventListener('click', start)

// 当视频被暂停时
video.addEventListener('pause', function () {
    // 显示"加载中"的提示
    showLoading();
    // 尝试播放视频
    video.play();
});

// 当视频开始播放时，隐藏"加载中"的提示，并调用drawVideoTocanvas函数
video.addEventListener('play', function () {
    hideLoading();
    firing2.style.visibility = 'visible';
    drawVideoTocanvas(video, canvas);
});

// 请求绘制视频到canvas当中
function drawVideoTocanvas(video, canvas) {
    // 使用2D渲染绘画
    let ctx = canvas.getContext('2d');
    // 关闭图像平滑
    ctx.imageSmoothingEnabled = false;
    function draw() {
        if (!video.paused && !video.ended) {
            // 清除旧帧
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // 绘制新帧
            ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);
            // 请求下一帧
            requestAnimationFrame(draw);
        }
    }
    draw();
}

// 显示“加载中”
function showLoading() {
    canvas.setAttribute(
        'style',
        'background-color:black;'
    )
    loading.setAttribute(
        'style',
        'display:flex;'
    )
}

// 隐藏“加载中”
function hideLoading() {
    loading.setAttribute(
        'style',
        'display:none;'
    )
    canvas.setAttribute(
        'style',
        'background-color:#f0f0f0;'
    )
}