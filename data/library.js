/* ZIPLAN · 자료실 데이터 — 저작권 걱정 없이 쓸 수 있는 건축 자료원
   checked: 라이선스 확인일. 라이선스는 바뀌고, 같은 사이트 안에서도 자료마다 다를 수 있으니
   항목의 "주의"를 꼭 읽고, 쓰기 전에 그 자료 페이지의 라이선스 줄을 한 번 더 봅니다.
   lic 코드: CC0(제한 없음) · PD(퍼블릭 도메인) · KOGL1(공공누리 1유형: 출처표시만) · KOGLx(유형 자료마다 다름)
             CCBY(출처표시) · CCMIX(자료마다 다른 CC) · SITE(사이트 고유 라이선스, 상업 가능) · ODbL(출처표시+동일조건) · OFL(서체 라이선스)
   use: panel(학교 패널·크릿) / portfolio(취업·유학 포트폴리오) / commercial(공모전·실무·판매물) — true면 가능, 'attr'면 출처 표기하면 가능 */
window.LIBRARY_DATA = {
  checked: '2026-10-12',
  licenses: {
    CC0:   { name:'CC0 · 저작권 포기', attr:false, note:'출처 표기 없이 어디든. 다만 "내가 만들었다"고 하거나 재라이선스는 안 됨.' },
    PD:    { name:'퍼블릭 도메인', attr:false, note:'저작권이 끝났거나 공공 저작물. 사진 속 상표·인물 초상은 별개.' },
    KOGL1: { name:'공공누리 1유형', attr:true, note:'출처만 표시하면 상업 이용·변경 모두 가능. "출처: 기관명(공공누리 1유형)".' },
    KOGLx: { name:'공공누리 (유형 확인)', attr:true, note:'1유형=출처만 / 2유형=상업 금지 / 3유형=변경 금지 / 4유형=상업·변경 금지. 자료마다 유형 마크를 확인.' },
    CCBY:  { name:'CC BY', attr:true, note:'작가·제목·라이선스·링크를 적으면 상업 이용·변경 가능. "BY-NC"면 상업 금지, "ND"면 변경 금지.' },
    CCMIX: { name:'CC (자료마다 다름)', attr:true, note:'검색 필터를 "상업적 이용 허용·변경 허용"으로 걸고, 각 자료의 CC 종류를 확인.' },
    SITE:  { name:'사이트 라이선스 (상업 가능)', attr:false, note:'무료·상업 가능이지만 "사진 자체를 팔기"나 "비슷한 서비스 만들기"는 금지. 출처 표기는 권장.' },
    ODbL:  { name:'ODbL (지도 데이터)', attr:true, note:'"© OpenStreetMap contributors" 표기. 데이터를 가공해 배포하면 같은 조건으로.' },
    OFL:   { name:'SIL OFL (서체)', attr:false, note:'패널·포트폴리오·상업물 모두 가능. 서체 파일 자체를 파는 것만 금지.' }
  },
  cats: [
    ['photo','사진'],['korea','한국 공공자료'],['texture','텍스처·HDRI·재료'],['model','3D 모델'],['map','지도·지형·GIS'],['drawing','도면·아카이브'],['font','서체·아이콘'],['people','사람·배경 소스']
  ],
  items: [
    /* 사진 */
    { cat:'photo', name:'Wikimedia Commons', lic:'CCMIX', url:'https://commons.wikimedia.org/', what:'1억 장 넘는 사진·도면·지도. 건축물 항목마다 사진이 모여 있고 PD·CC0·CC BY가 많다.', how:'검색 → 왼쪽 "License" 필터 → 파일 페이지의 라이선스 상자를 확인하고 작가·라이선스를 적는다.', use:{panel:'attr',portfolio:'attr',commercial:'attr'}, caution:'CC BY-SA(동일조건)는 패널은 되지만 상업 배포물에선 같은 조건으로 공개해야 함.' },
    { cat:'photo', name:'Flickr Commons', lic:'PD', url:'https://www.flickr.com/commons', what:'전 세계 도서관·박물관이 올린 "알려진 저작권 제한 없음" 사진. 20세기 초 도시·건물 사진이 풍부.', how:'Commons에서 기관별로 보기. 일반 Flickr 검색은 "Creative Commons" 필터를 건다.', use:{panel:true,portfolio:true,commercial:true}, caution:'일반 Flickr 사진은 대부분 저작권 있음 — Commons와 CC 필터 결과만.' },
    { cat:'photo', name:'Unsplash', lic:'SITE', url:'https://unsplash.com/s/photos/architecture', what:'고해상도 건축·도시·재료 사진. 분위기 컷, 배경, 콜라주 소스로.', how:'다운로드 즉시 사용. 작가 이름 표기 권장.', use:{panel:true,portfolio:true,commercial:true}, caution:'Unsplash+ (유료) 사진 제외. 사진을 그대로 파는 것 금지.' },
    { cat:'photo', name:'Pexels', lic:'SITE', url:'https://www.pexels.com/search/architecture/', what:'Unsplash와 비슷. 영상 클립도 무료.', how:'다운로드 즉시 사용.', use:{panel:true,portfolio:true,commercial:true}, caution:'사람 사진은 인물 사용 범위(광고 등)를 따로 봐야 함.' },
    { cat:'photo', name:'Library of Congress — Free to Use', lic:'PD', url:'https://www.loc.gov/free-to-use/', what:'미 의회도서관이 "제한 없음"으로 골라 둔 묶음. 건축·도시·지도 세트가 있다.', how:'세트별로 보고 고해상도 TIFF 다운로드.', use:{panel:true,portfolio:true,commercial:true}, caution:'' },
    { cat:'photo', name:'Smithsonian Open Access', lic:'CC0', url:'https://www.si.edu/openaccess', what:'스미스소니언 박물관 500만 점 이상 CC0 — 건축 도면, 디자인 오브젝트, 사진, 3D 스캔.', how:'검색 후 "CC0" 필터.', use:{panel:true,portfolio:true,commercial:true}, caution:'' },
    { cat:'photo', name:'The Met Open Access', lic:'CC0', url:'https://www.metmuseum.org/art/collection/search?showOnly=openAccess', what:'메트로폴리탄 미술관 소장품 사진 CC0. 건축 드로잉·장식·가구.', how:'"Open Access" 체크 후 검색.', use:{panel:true,portfolio:true,commercial:true}, caution:'' },
    { cat:'photo', name:'Rijksmuseum / Art Institute of Chicago / Cleveland Museum', lic:'CC0', url:'https://www.rijksmuseum.nl/en/collection', what:'유럽·미국 미술관 CC0 컬렉션. 옛 건축 판화·도시 조감도·도면이 많다.', how:'각 사이트에서 "public domain / CC0" 필터.', use:{panel:true,portfolio:true,commercial:true}, caution:'' },
    { cat:'photo', name:'Europeana', lic:'CCMIX', url:'https://www.europeana.eu/', what:'유럽 문화유산 5천만 점 포털. 건축 사진·도면·엽서.', how:'검색 → "Can I use this?" 필터를 "Yes" 또는 "Yes with attribution"으로.', use:{panel:'attr',portfolio:'attr',commercial:'attr'}, caution:'기관마다 라이선스가 달라 필터를 꼭 걸 것.' },
    { cat:'photo', name:'Openverse', lic:'CCMIX', url:'https://openverse.org/', what:'CC 라이선스 이미지·소리 통합 검색 엔진(크리에이티브 커먼즈 공식).', how:'검색 → 라이선스 필터 → 결과의 출처 페이지에서 한 번 더 확인.', use:{panel:'attr',portfolio:'attr',commercial:'attr'}, caution:'' },

    /* 한국 공공자료 */
    { cat:'korea', name:'공공누리 포털', lic:'KOGLx', url:'https://www.kogl.or.kr/', what:'정부·공공기관 저작물 통합 검색. 사진·도면·보고서·영상.', how:'검색 → 유형 필터 "1유형"으로 좁히기 → 출처 표기.', use:{panel:'attr',portfolio:'attr',commercial:'attr'}, caution:'2·4유형은 상업 금지 — 공모전·실무엔 1유형만.' },
    { cat:'korea', name:'국가유산포털 (국가유산청)', lic:'KOGLx', url:'https://www.heritage.go.kr/', what:'문화유산 사진·실측도면·3D. 전통 건축 평면·단면·입면 실측도가 상당수 공개.', how:'유산 검색 → "사진·도면" 탭 → 공공누리 마크 확인.', use:{panel:'attr',portfolio:'attr',commercial:'attr'}, caution:'자료마다 유형이 다름. 1유형이 많지만 확인 필수.' },
    { cat:'korea', name:'국립중앙박물관 e뮤지엄', lic:'KOGLx', url:'https://www.emuseum.go.kr/', what:'전국 박물관 소장품 사진. 옛 지도·회화 속 건축·도시.', how:'검색 → 공공누리 유형 확인 → 고해상 다운로드.', use:{panel:'attr',portfolio:'attr',commercial:'attr'}, caution:'' },
    { cat:'korea', name:'국가기록원 — 건축도면 컬렉션', lic:'KOGLx', url:'https://www.archives.go.kr/', what:'일제강점기~근대 관공서·학교·역사의 건축 도면 원본 이미지.', how:'기록검색 → "건축도면" → 열람·다운로드.', use:{panel:'attr',portfolio:'attr',commercial:'attr'}, caution:'' },
    { cat:'korea', name:'서울기록원 · 서울사진아카이브', lic:'KOGLx', url:'https://archives.seoul.go.kr/', what:'서울의 시대별 항공·거리·건물 사진. 대지 분석의 "과거" 레이어에.', how:'검색 → 공공누리 유형 확인.', use:{panel:'attr',portfolio:'attr',commercial:'attr'}, caution:'' },
    { cat:'korea', name:'한국관광공사 포토코리아', lic:'KOGLx', url:'https://phototour.visitkorea.or.kr/', what:'전국 관광지·건축물 고해상 사진.', how:'검색 → 유형 확인(1유형 다수).', use:{panel:'attr',portfolio:'attr',commercial:'attr'}, caution:'3·4유형(변경 금지) 사진은 콜라주·보정 불가.' },
    { cat:'korea', name:'공공데이터포털 (data.go.kr)', lic:'KOGLx', url:'https://www.data.go.kr/', what:'건축물대장·용도지역·인구·교통 등 분석 데이터와 API.', how:'검색 → 파일/오픈API → 이용 허락 범위 확인.', use:{panel:'attr',portfolio:'attr',commercial:'attr'}, caution:'' },

    /* 텍스처·HDRI */
    { cat:'texture', name:'Poly Haven', lic:'CC0', url:'https://polyhaven.com/', what:'HDRI(조명·배경), PBR 텍스처(콘크리트·벽돌·나무·금속), 모델. 렌더 품질이 가장 좋은 CC0.', how:'원하는 해상도로 다운로드. 출처 표기 불필요(권장).', use:{panel:true,portfolio:true,commercial:true}, caution:'' },
    { cat:'texture', name:'ambientCG', lic:'CC0', url:'https://ambientcg.com/', what:'2천 종 이상 PBR 재료·HDRI·데칼. 외장재 샘플 보드 만들기에.', how:'다운로드 즉시 사용.', use:{panel:true,portfolio:true,commercial:true}, caution:'' },
    { cat:'texture', name:'Texture Haven → Poly Haven 통합', lic:'CC0', url:'https://polyhaven.com/textures', what:'(안내) 옛 Texture Haven·HDRI Haven은 Poly Haven으로 합쳐짐.', how:'', use:{panel:true,portfolio:true,commercial:true}, caution:'' },
    { cat:'texture', name:'Wikimedia Commons — Textures 분류', lic:'CCMIX', url:'https://commons.wikimedia.org/wiki/Category:Textures', what:'실제 건물 외장 클로즈업 사진 다수.', how:'라이선스 확인.', use:{panel:'attr',portfolio:'attr',commercial:'attr'}, caution:'' },

    /* 3D */
    { cat:'model', name:'Sketchfab (CC 필터)', lic:'CCMIX', url:'https://sketchfab.com/search?licenses=322a749bcfa841b29dff1e8a1bb74b0b&type=models', what:'사람·나무·가구·차량 등 엔투라지. 건물 스캔도.', how:'검색 → "Downloadable" + 라이선스 필터(CC0 / CC BY).', use:{panel:'attr',portfolio:'attr',commercial:'attr'}, caution:'CC BY-NC(상업 금지) 모델이 많으니 필터 필수.' },
    { cat:'model', name:'Smithsonian 3D', lic:'CC0', url:'https://3d.si.edu/', what:'박물관 소장품·건축 요소 3D 스캔.', how:'다운로드(glTF·OBJ).', use:{panel:true,portfolio:true,commercial:true}, caution:'' },
    { cat:'model', name:'Poly Haven — Models', lic:'CC0', url:'https://polyhaven.com/models', what:'가구·소품·식생 모델.', how:'', use:{panel:true,portfolio:true,commercial:true}, caution:'' },
    { cat:'model', name:'Kenney · Quaternius', lic:'CC0', url:'https://kenney.nl/assets', what:'로우폴리 사람·나무·차량 세트. 다이어그램·개념 모형에 어울림.', how:'', use:{panel:true,portfolio:true,commercial:true}, caution:'' },
    { cat:'model', name:'브이월드 3D (국토부)', lic:'KOGLx', url:'https://www.vworld.kr/', what:'전국 3D 건물·지형. 대지 주변 매스를 바로 얻는 공공 소스.', how:'회원가입 → 오픈API·데이터 다운로드 → 이용약관 확인.', use:{panel:'attr',portfolio:'attr',commercial:'attr'}, caution:'API 호출량 제한. 상업 서비스에 쓰려면 약관 확인.' },

    /* 지도·지형 */
    { cat:'map', name:'OpenStreetMap', lic:'ODbL', url:'https://www.openstreetmap.org/', what:'도로·건물 외곽·용도 데이터. 대지 분석 기본 지도.', how:'Export 또는 Overpass로 영역 추출. "© OpenStreetMap contributors" 표기.', use:{panel:'attr',portfolio:'attr',commercial:'attr'}, caution:'' },
    { cat:'map', name:'국토정보플랫폼 (국토지리정보원)', lic:'KOGLx', url:'https://map.ngii.go.kr/', what:'수치지도·DEM·정사영상·항공사진. 등고선·지형 모델의 공식 소스.', how:'회원가입 → 지도 검색 → 다운로드 → 자료별 공공누리 유형 확인.', use:{panel:'attr',portfolio:'attr',commercial:'attr'}, caution:'일부 자료는 보안·용도 제한. 1유형 표시된 것만 자유.' },
    { cat:'map', name:'서울 열린데이터광장 · 지자체 GIS', lic:'KOGLx', url:'https://data.seoul.go.kr/', what:'서울 건물·용도·인구·교통 데이터. 다른 시도는 각 지자체 포털.', how:'', use:{panel:'attr',portfolio:'attr',commercial:'attr'}, caution:'' },
    { cat:'map', name:'토지이음', lic:'KOGLx', url:'https://www.eum.go.kr/', what:'용도지역·지구단위계획·규제 확인. 내집코드 뒤에 꼭 한 번.', how:'주소 검색 → 토지이용계획 열람.', use:{panel:'attr',portfolio:'attr',commercial:'attr'}, caution:'' },
    { cat:'map', name:'USGS · NASA SRTM / Copernicus DEM', lic:'PD', url:'https://earthexplorer.usgs.gov/', what:'전 세계 30m 지형. 해외 대지·유학 프로젝트.', how:'', use:{panel:true,portfolio:true,commercial:true}, caution:'' },

    /* 도면·아카이브 */
    { cat:'drawing', name:'HABS / HAER / HALS (미 의회도서관)', lic:'PD', url:'https://www.loc.gov/collections/historic-american-buildings-landscapes-and-engineering-records/', what:'미국 역사 건축물 58만 장의 실측 도면(평·입·단면·디테일)과 사진. "도면은 이렇게 그린다"의 교과서.', how:'검색 → 도면 TIFF 다운로드. 사례 배우기와 같이 보기.', use:{panel:true,portfolio:true,commercial:true}, caution:'미 연방정부 저작물이라 대부분 제한 없음. 개별 항목의 Rights 줄은 확인.' },
    { cat:'drawing', name:'Internet Archive — Building Technology Heritage Library', lic:'PD', url:'https://archive.org/details/buildingtechnologyheritagelibrary', what:'19~20세기 건축 자재 카탈로그·디테일 도집. 재료·디테일 다이어그램 소스.', how:'PDF·이미지 다운로드.', use:{panel:true,portfolio:true,commercial:true}, caution:'' },
    { cat:'drawing', name:'Gallica (프랑스 국립도서관) · ETH e-rara', lic:'PD', url:'https://gallica.bnf.fr/', what:'고전 건축서(팔라디오·비올레르뒤크 등)의 원본 도판.', how:'', use:{panel:true,portfolio:true,commercial:true}, caution:'Gallica는 비상업 이용은 자유, 상업은 조건 확인.' },
    { cat:'drawing', name:'Wikimedia Commons — Architectural drawings', lic:'CCMIX', url:'https://commons.wikimedia.org/wiki/Category:Architectural_drawings', what:'국가별·시대별 건축 도면 분류.', how:'', use:{panel:'attr',portfolio:'attr',commercial:'attr'}, caution:'' },
    { cat:'drawing', name:'ZIPLAN 광장', lic:'CCBY', url:'#plaza', what:'이 사이트에 올라온 학생 패널·도면. 올릴 때 CC BY로 공개 동의.', how:'사례로 쓸 땐 "ZIPLAN 광장 · 익명 (학교·학년)" 표기.', use:{panel:'attr',portfolio:'attr',commercial:false}, caution:'학생 작품은 포트폴리오에 "참고"로만. 상업 배포 금지.' },

    /* 서체·아이콘 */
    { cat:'font', name:'Google Fonts (OFL)', lic:'OFL', url:'https://fonts.google.com/?subset=korean', what:'Noto Sans KR·Pretendard(별도)·Archivo 등. 패널·포트폴리오 서체.', how:'다운로드 → 설치. 표기 불필요.', use:{panel:true,portfolio:true,commercial:true}, caution:'' },
    { cat:'font', name:'눈누', lic:'OFL', url:'https://noonnu.cc/', what:'한글 무료 서체 모음. 서체마다 "인쇄·영상·포장·임베딩" 허용 표가 있다.', how:'서체 페이지의 허용 범위 표 확인.', use:{panel:true,portfolio:true,commercial:'attr'}, caution:'일부는 기업·브랜드 상업 사용 제한 — 표를 꼭 보기.' },
    { cat:'font', name:'Lucide · Phosphor · Tabler 아이콘', lic:'CCBY', url:'https://lucide.dev/', what:'다이어그램용 선 아이콘(사람·나무·해·바람). MIT/ISC.', how:'SVG 복사.', use:{panel:true,portfolio:true,commercial:true}, caution:'' },

    /* 사람·배경 소스 */
    { cat:'people', name:'Skalgubbar · Mr. Cutout (무료분)', lic:'SITE', url:'https://skalgubbar.se/', what:'렌더용 사람 컷아웃. 패널의 축척 인물.', how:'사이트 라이선스 확인(무료·비상업 조건이 섞임).', use:{panel:true,portfolio:true,commercial:'attr'}, caution:'상업 사용 조건은 사이트마다 다름.' },
    { cat:'people', name:'Pexels · Unsplash "people walking"', lic:'SITE', url:'https://www.pexels.com/search/people%20walking/', what:'직접 누끼 따서 쓰는 사람 소스.', how:'', use:{panel:true,portfolio:true,commercial:true}, caution:'광고성 상업물에 인물은 초상권 별도.' },
    { cat:'people', name:'Pinterest·인스타·ArchDaily 이미지', lic:'none', url:'https://www.pinterest.com/', what:'(주의) 보는 건 자유지만 가져다 쓰면 안 되는 곳. 영감·레퍼런스 보드로만.', how:'레퍼런스는 "출처: 건축가·프로젝트명·사진가"로 캡션 처리하고, 패널·포트폴리오엔 직접 싣지 않기.', use:{panel:false,portfolio:false,commercial:false}, caution:'학교 패널에 레퍼런스로 작게 싣는 관행이 있지만, 포트폴리오·공모전엔 넣지 말 것.' }
  ]
};
