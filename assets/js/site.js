/* 안도 기러기캠핑장 공통 동작: 모바일 메뉴, 사진 넘기기, 배치도 전환, 문의 채팅, 캐릭터 안내 탭 */
(function () {
  'use strict';
  var A = window.ANDO || { base: '', page: '' };
  var state = { menuOpen: false, photo: false, hintGone: false, chatOpen: false, bi: 'coop' };

  function qa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // 화면에 보일 조각(x-if)을 지금 상태에 맞춰 보이거나 숨긴다
  function vals() {
    var b = state.bi;
    return {
      menuOpen: state.menuOpen, menuClosed: !state.menuOpen,
      showMap: !state.photo, showPhoto: state.photo, showHint: !state.hintGone,
      chatOpen: state.chatOpen,
      biCoop: b === 'coop', biCoopOff: b !== 'coop', biChar: b === 'char', biCharOff: b !== 'char', biCamp: b === 'camp', biCampOff: b !== 'camp'
    };
  }
  function render() {
    var v = vals();
    qa('x-if').forEach(function (el) {
      var k = el.getAttribute('data-if');
      if (Object.prototype.hasOwnProperty.call(v, k)) { el.hidden = !v[k]; }
    });
    document.documentElement.classList.toggle('menu-open', state.menuOpen);
  }
  function set(patch) {
    for (var k in patch) { if (Object.prototype.hasOwnProperty.call(patch, k)) { state[k] = patch[k]; } }
    render();
  }

  // ---------------------------------------------------------------- 문의 채팅
  var L = {
    home: A.base + '#access', price: A.base + 'price/', rules: A.base + 'guide/', reserve: A.base + 'reserve/',
    facility: A.base + 'info/', ando: A.base + 'travel/ando/'
  };

  // 답을 만드는 곳. 지금은 사이트에 실린 내용에서 골라 답한다. 나중에 AI 답변으로 바꿀 때 이 함수만 바꾸면 된다.
  function answer(q, L) {
// 답을 만드는 곳. 지금은 사이트에 실린 내용에서 골라 답하고, 나중에 AI 답변으로 바꿀 때 이 함수만 바꾸면 된다.
var t = String(q || '').replace(/\s+/g, '');
var tel = 'tel:0616626664';
var rules = [
[['배편', '배시간', '배표', '배타', '배를', '배로', '배는', '여객선', '신기항', '여천항', '한림', '오시는', '오는길', '오는법', '가는길', '가는법', '위치', '주소', '어디', '교통'],
'안도는 배를 타고 들어오는 섬이에요.\n· 돌산 신기항 → 금오도 여천항: 약 25분, 하루 9회, 차도 실을 수 있어요.\n· 여수항 → 금오도 여천항: 약 1시간, 하루 2회\n여천항에서 차로 20분쯤 달려 안도대교를 건너면 캠핑장이에요. 배표는 당일 현장에서 끊어요.\n배 시간은 한림해운 061-666-8092로 확인해 주세요.', L.home, '오시는 길 보기'],
[['환불', '취소'],
'취소하시면 방문일까지 남은 날짜에 따라 환불 비율이 달라져요.\n10일 전까지 100%, 9~7일 전 90%, 6일 전 80%, 5일 전 70%, 4일 전 50%, 3일 전 40%, 2일 전 20%예요. 하루 전과 당일에는 환불이 안 돼요.', L.price, '환불 규정 보기'],
[['요금', '가격', '얼마', '비용', '금액'],
'1박 요금이에요.\n· 캠핑 사이트: 비수기 5만 원, 성수기 6만 원\n· 기러기 펜션: 비수기 15만 원, 성수기 20만 원\n성수기는 7월 15일부터 8월 20일까지예요.', L.price, '이용 요금 보기'],
[['반려', '강아지', '애견', '고양이', '펫'],
'아쉽지만 반려동물은 함께 들어올 수 없어요.', L.rules, '이용 안내 보기'],
[['입실', '퇴실', '체크인', '체크아웃', '몇시', '매너', '조용'],
'입실은 14시부터, 퇴실은 다음 날 11시까지예요. 밤 11시가 지나면 캠핑장에 드나들 수 없어요.\n밤 10시부터 아침 7시까지는 모두 조용히 쉬는 매너 타임이에요.', L.rules, '이용 안내 보기'],
[['인원', '몇명', '가족', '다자녀'],
'기준 인원은 4인 1가족(성인 2명, 소아 2명)이에요. 다자녀 가정(1세대)은 주민등록등본을 가져오시면 예외로 해 드려요.', L.rules, '이용 안내 보기'],
[['흡연', '담배', '금연'],
'캠핑장 안은 금연이에요.', L.rules, '이용 안내 보기'],
[['화롯대', '화로', '불멍', '장작', '숯'],
'화롯대는 데크 위에서는 쓸 수 없어요. 쓰신 화롯대는 전용 세척 장소에서 씻고, 남은 재는 전용 수거함에 버려 주세요.', L.rules, '이용 안내 보기'],
[['폭죽', '불꽃'],
'불꽃놀이(폭죽)는 할 수 없어요.', L.rules, '이용 안내 보기'],
[['방문객', '방문차', '손님', '지인'],
'방문객과 방문 차량은 들어올 수 없어요. 예약하신 분과 오신 분이 다르면 입실하실 수 없어요.', L.rules, '이용 안내 보기'],
[['전기', '콘센트', '히터', '난로'],
'데크 사이트마다 전기 콘센트가 있어요. 다만 고출력 전기제품은 쓸 수 없고, 텐트 안에서 쓰는 전기제품은 모두 합쳐 600W 이하가 기준이에요.', L.facility, '시설 안내 보기'],
[['예약', '예매', '네이버'],
'예약은 네이버 예약에서 받아요.\n먼저 배 시간을 확인하고, 예약 안내를 읽은 다음 "네이버 예약으로 예약하기"를 눌러 주세요.', L.reserve, '예약 안내 보기'],
[['시설', '샤워', '화장실', '개수대', '매점', '놀이터', '주차', '데크', '펜션', '사이트'],
'데크 사이트 11면(6×4m, 사이트 옆 주차, 전기 콘센트, 테이블)과 기러기 펜션 3개 동이 있어요.\n개별 샤워실, 화장실, 개수대, 놀이터, 휴게소, 다목적실, 매점을 함께 쓸 수 있어요.', L.facility, '시설 안내 보기'],
[['주변', '관광', '여행', '볼거리', '놀거리', '비렁길', '금오도', '여수', '돌산', '먹거리', '맛집', '낚시', '해변', '해수욕'],
'캠핑장 가까이에 이야포 몽돌 해변과 안도 해수욕장, 안도 기러기길이 있어요. 금오도 비렁길과 여수·돌산도 함께 둘러보기 좋아요.', L.ando, '주변 여행 보기'],
[['조합', '운영', '누가'],
'안도 기러기캠핑장은 안도 주민들이 만든 안도마을협동조합이 운영해요. 캠핑장에서 생긴 수익은 마을로 돌아가요.', '', ''],
[['전화', '연락', '번호', '문의', '상담'],
'전화 문의는 061-662-6664로 해 주세요.', tel, '전화 걸기'],
[['고마', '감사'],
'도움이 됐다니 기뻐요. 안도에서 편안히 쉬다 가세요!', '', ''],
[['안녕', '반가'],
'안녕하세요! 궁금한 걸 편하게 물어봐 주세요.', '', '']
];
for (var i = 0; i < rules.length; i++) {
for (var j = 0; j < rules[i][0].length; j++) {
if (t.indexOf(rules[i][0][j]) >= 0) { return { text: rules[i][1], href: rules[i][2], label: rules[i][3] }; }
}
}
return { text: '그 내용은 제가 아직 잘 몰라요. 전화 061-662-6664로 물어봐 주시면 자세히 알려 드릴게요.', href: tel, label: '전화 걸기' };
}

  function addMsg(tplId, text, link) {
    var box = document.getElementById('chat-box');
    var tpl = document.getElementById(tplId);
    if (!box || !tpl || !tpl.content) { return; }
    var node = tpl.content.firstElementChild.cloneNode(true);
    var f = node.querySelector('[data-f="text"]');
    if (f) { f.textContent = text; }
    var a = node.querySelector('[data-f="link"]');
    if (a) {
      if (link && link.href) { a.setAttribute('href', link.href); a.textContent = link.label; } else { a.parentNode.removeChild(a); }
    }
    box.appendChild(node);
  }
  function ask(q) {
    var a = answer(q, L);
    addMsg('tpl-me', q);
    addMsg('tpl-bot', a.text, { href: a.href, label: a.label });
    set({ chatOpen: true });
    setTimeout(function () { var b = document.getElementById('chat-box'); if (b) { b.scrollTop = b.scrollHeight; } }, 60);
  }
  function send() {
    var el = document.getElementById('chat-input');
    if (!el || !el.value.replace(/\s+/g, '')) { return; }
    var v = el.value.replace(/^\s+|\s+$/g, '');
    el.value = '';
    ask(v);
  }

  // ---------------------------------------------------------------- 누르는 동작
  var ACT = {
    toggleMenu: function () { set({ menuOpen: !state.menuOpen }); },
    closeMenu: function () { set({ menuOpen: false }); return true; },          // 링크는 그대로 따라간다
    toggleChat: function () { set({ chatOpen: !state.chatOpen }); },
    closeChat: function () { set({ chatOpen: false }); },
    chatSend: send,
    chatAsk: function (el) { ask(el.getAttribute('data-q')); },
    togglePhoto: function () { set({ photo: !state.photo }); },
    pickCoop: function () { set({ bi: 'coop' }); },
    pickChar: function () { set({ bi: 'char' }); },
    pickCamp: function () { set({ bi: 'camp' }); },
    slide: function (el) {
      var box = document.querySelector('[data-slider="' + el.getAttribute('data-target') + '"]');
      if (box) { box.scrollBy({ left: Number(el.getAttribute('data-dir')) * box.clientWidth, behavior: 'smooth' }); }
    }
  };
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-act]') : null;
    if (!el) { return; }
    var fn = ACT[el.getAttribute('data-act')];
    if (!fn) { return; }
    if (fn(el) !== true) { e.preventDefault(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (state.menuOpen || state.chatOpen) { set({ menuOpen: false, chatOpen: false }); }
      return;
    }
    var t = e.target;
    if (t && t.id === 'chat-input' && e.key === 'Enter') {
      if (e.isComposing || e.keyCode === 229) { return; }      // 한글 조합 중에는 보내지 않는다
      e.preventDefault();
      send();
      return;
    }
    if ((e.key === 'Enter' || e.key === ' ') && t && t.getAttribute && t.getAttribute('role') === 'button' && t.hasAttribute('data-act')) {
      e.preventDefault();
      t.click();
    }
  });

  // 배치도 '옆으로 밀어서 볼 수 있어요' 안내는 한 번 밀면 사라진다
  qa('[data-hint-area]').forEach(function (el) {
    var gone = function () { if (!state.hintGone) { set({ hintGone: true }); } };
    el.addEventListener('scroll', gone, { passive: true });
    el.addEventListener('pointerdown', gone, { passive: true });
  });

  // 넓은 화면으로 바뀌면 모바일 메뉴를 닫는다
  window.addEventListener('resize', function () { if (state.menuOpen && window.innerWidth >= 1124) { set({ menuOpen: false }); } });
  window.addEventListener('pageshow', function () { if (state.menuOpen) { set({ menuOpen: false }); } });

  // 예전 한 페이지 사이트의 주소(#menu2 등)로 들어오면 새 페이지로 보낸다
  if (A.page === 'main') {
    var old = { '#menu2': 'info/', '#menu3': 'guide/', '#menu4': 'price/', '#menu6': '#access' }[location.hash];
    if (old) { location.replace(A.base + old); }
  }

  // 캐릭터 안내: 주소 뒤에 #coop, #char, #camp 를 붙이면 그 탭이 열린다
  if (A.page === 'brand') {
    var pick = function () {
      var h = location.hash.replace('#', '');
      if (h === 'coop' || h === 'char' || h === 'camp') { set({ bi: h }); }
    };
    window.addEventListener('hashchange', pick);
    pick();
  }

  render();
})();
