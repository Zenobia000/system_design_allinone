"""
批量生成「架構師的藍圖」PPT 風格化 diagram 圖（Mental Model + Trade-off Matrix + 結構圖）
搭配既有 Mermaid 渲染檔當組圖使用，補在原檔名後加 `_concept` 後綴。

共 28 張：
- B 類 Mental Model × 10（每章一張）
- D 類 Trade-off Matrix × 6
- C/E 類 結構圖 × 12
"""
import os
import sys
import base64
import time
from pathlib import Path


def load_env_from_file(path: Path):
    if not path.exists():
        return
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


load_env_from_file(Path.cwd() / ".env")
load_env_from_file(Path.home() / ".openai.env")

ROOT = Path(__file__).resolve().parent

STYLE_BLOCK = (
    "Hand-drawn educational diagram style, editorial illustration aesthetic, "
    "warm color palette: cream off-white #F5F1E8 background, warm orange #D97757 "
    "for primary/emphasis, deep brown #8B6F47 for secondary lines and dark text, "
    "soft red #E8634F for warnings/anti-patterns, moss green #5B9770 for "
    "recommended/safe. Clean geometric boxes with hand-sketched borders, slight "
    "wobble in arrows, subtle paper texture, minimalist flat vector look, "
    "labels written in clean readable handwritten typography, ample whitespace, "
    "calm composed mood. No photo-realistic, 3d render, neon, gradient glow, "
    "watermark, kawaii, anime."
)

IMAGES = [
    # ==================== B 類 · Mental Model × 10 ====================
    {
        "chapter": "01-role-value",
        "filename": "00_mental_model_concept.png",
        "subject": (
            "A hand-drawn educational diagram showing three horizontal layered "
            "rectangles stacked vertically on cream paper. Top rectangle "
            "labeled 'BUSINESS · 商業策略 / ROI / 風險' in soft cream beige "
            "with deep brown border. Middle rectangle, largest and emphasized, "
            "filled in warm orange with thicker stroke, labeled 'ARCHITECTURE "
            "· 系統決策 / 取捨 / 標準'. Bottom rectangle labeled "
            "'IMPLEMENTATION · 代碼實作 / debug / refactor' in cream with deep "
            "brown border. Two curved hand-drawn arrows connecting them: "
            "BUSINESS → ARCHITECTURE annotated '向上翻譯', ARCHITECTURE → "
            "IMPLEMENTATION annotated '向下翻譯'."
        ),
        "composition": (
            "centered three-layer stack occupying middle 70%; title overlay "
            "area at top; ample whitespace on sides; warm sidelight."
        ),
    },
    {
        "chapter": "02-requirements-sla",
        "filename": "00_mental_model_concept.png",
        "subject": (
            "A hand-drawn iceberg-style educational diagram on cream paper. "
            "Above water line (small visible tip, about 15% of total height): "
            "a cream rectangle labeled 'FUNCTIONAL · 系統做什麼 · 顯性，PM "
            "會講'. Below water line (large submerged base, 70% of total "
            "height): a warm orange filled rectangle labeled 'NON-FUNCTIONAL "
            "· 系統承受什麼 · 隱性，要逼問' with subitems listed in two rows: "
            "'load · latency · uptime' and 'scale · cost · security'. The "
            "waterline drawn as a wavy dashed line across. Bottom small caption "
            "in soft red: '架構失敗 90% 出在下層沒挖清楚'."
        ),
        "composition": (
            "iceberg vertically centered; water surface line across upper "
            "third; ample whitespace; calm composed mood."
        ),
    },
    {
        "chapter": "03-process-app-types",
        "filename": "00_mental_model_concept.png",
        "subject": (
            "A hand-drawn horizontal flowchart on cream paper showing six "
            "warm orange filled circles connected by solid arrows from left to "
            "right, each circle containing a number and label: '① 理解需求', "
            "'② 概念設計', '③ 技術選型', '④ 組件設計', '⑤ 風險評估', '⑥ "
            "實施指導'. Below each circle, a small dashed-border cream "
            "rectangle showing the deliverable: 'PRD / NFR', 'Domain Model', "
            "'Tech Stack / ADR', 'C4 / API Spec', 'Risk Report', 'Guidelines "
            "/ Scaffold'."
        ),
        "composition": (
            "six steps spread horizontally with even spacing; outputs hanging "
            "below each step on dashed leader lines; ample whitespace top and "
            "bottom."
        ),
    },
    {
        "chapter": "04-tech-stack-data",
        "filename": "00_mental_model_concept.png",
        "subject": (
            "A hand-drawn hexagonal radar chart on cream paper with six axes "
            "labeled clockwise from top: '適用性', '成熟度', '社群', '人才', "
            "'成本', '演進路徑'. Two overlapping polygons: one solid warm "
            "orange filled polygon labeled '該選的 (高分)' covering most axes "
            "broadly, and a dashed soft red outline polygon labeled '該拒的 "
            "(低分)' shrunken inward. Center inside the chart: 'TCO Score' "
            "label. Subtle concentric grid lines and axis ticks visible."
        ),
        "composition": (
            "radar chart centered occupying middle 60%; legend in upper-right "
            "showing solid orange = recommended, dashed red = rejected."
        ),
    },
    {
        "chapter": "05-ilities",
        "filename": "00_mental_model_concept.png",
        "subject": (
            "A hand-drawn three-tier pyramid (point-up) on cream paper. Top "
            "smaller tier filled in soft red labeled '業務生死 · Scalability "
            "/ Reliability / Security'. Middle tier filled in warm orange "
            "labeled '工程效率 · Testability / Maintainability / Modularity'. "
            "Wide bottom tier filled in deep brown with cream text labeled "
            "'上線生存 · Observability / Manageability'. To the right of the "
            "pyramid, a hand-drawn note in deep brown handwriting: '好架構 "
            "≠ 全頂滿，而是知道哪兩個是命門'."
        ),
        "composition": (
            "pyramid centered, occupying middle 55%; side note in upper-right; "
            "ample whitespace; warm sidelight."
        ),
    },
    {
        "chapter": "06-components-patterns",
        "filename": "00_mental_model_concept.png",
        "subject": (
            "A hand-drawn two-panel comparison diagram on cream paper, split "
            "by a vertical dashed line. Left panel header '沒模式詞彙': "
            "scattered messy chaotic doodles with tangled arrows between "
            "vague shapes, two stick figures with furrowed brows and confused "
            "thought bubbles. Right panel header '用模式詞彙': clean labeled "
            "boxes 'Strategy', 'Adapter', 'Observer' connected by neat warm "
            "orange arrows, two stick figures nodding in agreement. Bottom "
            "center label: 'AI prompt accuracy: 1× vs 10×'."
        ),
        "composition": (
            "two equal panels side by side; dividing dashed line in the middle; "
            "bottom label centered spanning both panels."
        ),
    },
    {
        "chapter": "07-system-architecture",
        "filename": "00_mental_model_concept.png",
        "subject": (
            "A hand-drawn two-column comparison on cream paper, split by a "
            "vertical dashed line. Left column header '單體' in cream lists: "
            "'1 process', '1 memory', 'function call', '1 log file', '1 "
            "transaction'. Right column header '分散式' in warm orange lists: "
            "'N processes', '多份 + 一致性問題', 'API / queue call', '多份 + "
            "correlation ID', '分散事務 Saga'. Bottom centered warm orange "
            "banner: '90% 系統不該主動拆 → 撐不住才拆'."
        ),
        "composition": (
            "two columns side by side, each with header at top and bulleted "
            "items below; bottom banner spanning full width."
        ),
    },
    {
        "chapter": "08-advanced-patterns",
        "filename": "00_mental_model_concept.png",
        "subject": (
            "A hand-drawn inverted pyramid (wide top, narrow bottom point) on "
            "cream paper. Widest bottom layer (80% of width) filled in moss "
            "green labeled '單體 + 經典 3 層'. Middle layer (15%) filled in "
            "warm orange labeled '單體模組化 + 部分事件驅動'. Smallest top "
            "point (5%) filled in soft red labeled '微服務 + Event Sourcing + "
            "CQRS'. Right side hand-drawn note: '這 5% 是面試會考、工作不一定 "
            "遇到的部分'. Bottom caption in deep brown: '架構師的功課：知道 "
            "什麼時候不要用它們'."
        ),
        "composition": (
            "inverted pyramid centered, occupying middle 55%; side note in "
            "upper-right area; bottom caption."
        ),
    },
    {
        "chapter": "09-case-study",
        "filename": "00_mental_model_concept.png",
        "subject": (
            "A hand-drawn flow diagram on cream paper with vertical primary "
            "flow plus side constraints. Top: a cream rectangle labeled "
            "'理論最佳 · Ch.1-8 學的東西'. Middle: a soft red filled diamond "
            "labeled '撞上'. Bottom: a moss green filled rectangle labeled "
            "'實際可行的架構 · 妥協後的版本'. To the right, a cluster of five "
            "pale peach constraint cards labeled '時間 · Deadline 6 個月', "
            "'預算 · 50k cloud + 5 工程師', '技能 · 團隊熟 Python', '政治 · "
            "CTO 要求 AWS', '合規 · GDPR', all connected by dashed lines to "
            "the central diamond."
        ),
        "composition": (
            "central vertical flow occupying middle 40%; constraint cards "
            "clustered on the right side; ample whitespace."
        ),
    },
    {
        "chapter": "10-soft-skills",
        "filename": "00_mental_model_concept.png",
        "subject": (
            "A hand-drawn two-column comparison on cream paper. Left column "
            "header '傳統 manager' in pale peach lists: '權力來源 = 職位', "
            "'工具 = 命令', '失敗 = 員工離職'. Right column header '架構師' "
            "in moss green lists: '權力來源 = 專業 + 信任', '工具 = 說服 + "
            "範例', '失敗 = 建議被無視'. Bottom centered banner in warm "
            "orange: '架構師的軟實力 = 真正的硬功夫，不練 → 技術再強都推不動'."
        ),
        "composition": (
            "two equal columns side by side; column headers bold; items listed "
            "vertically; bottom banner spanning full width."
        ),
    },
    # ==================== D 類 · Trade-off Matrix × 6 ====================
    {
        "chapter": "01-role-value",
        "filename": "02_mindset_shift_01_matrix_concept.png",
        "subject": (
            "A hand-drawn 5-row × 3-column comparison table on cream paper. "
            "Row labels (leftmost column): '價值焦點', '問題框架', '技術選型', "
            "'成功指標', '知識深度'. Left content column titled '開發者模式' "
            "with soft red tinted cells. Middle column shows '→' warm orange "
            "arrows. Right content column titled '架構師模式' with moss green "
            "tinted cells. Each cell contains a short contrast label, e.g. "
            "row 1 left 'feature 完成' vs right '系統 ROI'; row 3 left '新 "
            "技術好玩' vs right '採購清單'."
        ),
        "composition": (
            "table centered occupying middle 80%; column headers bold at top; "
            "row labels left-aligned; subtle gridlines."
        ),
    },
    {
        "chapter": "01-role-value",
        "filename": "03_value_01_influence_map_concept.png",
        "subject": (
            "A hand-drawn radial influence map on cream paper. Center: a warm "
            "orange filled circle labeled '架構師'. Surrounding it, six "
            "smaller cream rectangles connected by hand-drawn radiating lines: "
            "'CEO/CTO · 商業價值' (top), 'Product · 需求轉譯' (upper-right), "
            "'Dev · 技術指導' (lower-right), 'QA · 品質規範' (bottom), 'Ops "
            "· SLA / 部署' (lower-left), 'Finance · 成本' (upper-left)."
        ),
        "composition": (
            "central node in middle; six surrounding nodes evenly distributed "
            "around the perimeter; clean radiating lines."
        ),
    },
    {
        "chapter": "05-ilities",
        "filename": "01_scalability_01_up_vs_out_concept.png",
        "subject": (
            "A hand-drawn two-row diagram on cream paper. Top row labeled "
            "'Scale Up (垂直)' in pale peach: three server box icons of "
            "increasing size labeled '小機器 → 中機器 → 頂規機器' connected "
            "by arrows annotated '換', with a small ceiling line above "
            "suggesting an upper limit. Bottom row labeled 'Scale Out (水平)' "
            "in moss green: a growing horizontal row of identical small "
            "server boxes labeled '1 機 → 3 機 → 10 機 → 100 機...' connected "
            "by arrows, with an open right edge suggesting unlimited."
        ),
        "composition": (
            "two horizontal rows stacked vertically; row labels on the left "
            "side; ample horizontal extent."
        ),
    },
    {
        "chapter": "08-advanced-patterns",
        "filename": "01_microservices_01_split_concept.png",
        "subject": (
            "A hand-drawn two-column trade-off comparison on cream paper. "
            "Left column titled '該拆 ✓' with moss green tinted header lists: "
            "'團隊 > 30 人', 'release 頻率差 10×', 'scaling 需求差大', '已有 "
            "K8s + observability'. Right column titled '不該拆 ✗' with soft "
            "red tinted header lists: '團隊 < 15 人', '沒 K8s 經驗', '監控 "
            "未到位', '「未來可能」', '追潮流'. Bottom center large bold "
            "warm orange banner: 'Modular Monolith 是 90% 系統的最佳解'."
        ),
        "composition": (
            "two equal columns side by side with bulleted items; bold banner "
            "across the bottom width."
        ),
    },
    {
        "chapter": "09-case-study",
        "filename": "02_cost_01_triangle_concept.png",
        "subject": (
            "A hand-drawn equilateral triangle diagram on cream paper. Three "
            "vertices labeled: 'Quality 品質' in moss green (top vertex), "
            "'Speed 速度' in warm orange (lower-right vertex), 'Cost 成本' in "
            "deep brown (lower-left vertex). Center inside the triangle, bold "
            "label: '三選二，第三必然犧牲'. Each edge annotated with a "
            "scenario in handwritten note style: top-right edge '緊急上線 "
            "(品質+速度 → 犧牲成本)', bottom edge 'MVP/創業 (速度+成本 → "
            "犧牲品質)', top-left edge '銀行/醫療 (品質+成本 → 犧牲速度)'."
        ),
        "composition": (
            "triangle centered occupying middle 65%; vertex labels just outside "
            "the corners; edge annotations along each side."
        ),
    },
    {
        "chapter": "10-soft-skills",
        "filename": "02_audience_01_matrix_concept.png",
        "subject": (
            "A hand-drawn 4-row × 3-column communication matrix on cream "
            "paper. Row labels (each in different warm tones): 'CEO/CTO', "
            "'PM', 'Dev', 'Ops'. Column headers: '關心 (cares about)', '該講 "
            "(talk about)', '例子 (one-liner)'. Sample cells: CEO row → 'ROI', "
            "'商業案例', '節省 X 美金'; PM row → 'UX', 'feature 影響', '能 "
            "支援 Y 用戶'; Dev row → 'Pattern', '技術細節', 'API 變化'; Ops "
            "row → 'SLA', '維運衝擊', 'P99 < 200ms'."
        ),
        "composition": (
            "matrix centered occupying middle 80%; column headers bold; row "
            "labels in colored highlights on the left; subtle gridlines."
        ),
    },
    # ==================== C/E 類 · Structure / Decision × 12 ====================
    {
        "chapter": "02-requirements-sla",
        "filename": "02_sla_math_01_nines_concept.png",
        "subject": (
            "A hand-drawn horizontal bar chart on cream paper showing SLA "
            "nines vs annual downtime. Five horizontal warm orange filled bars "
            "of decreasing length stacked top-to-bottom, each labeled on the "
            "left: '99%', '99.9%', '99.95%', '99.99%', '99.999%'. To the "
            "right of each bar, downtime label: '87h/year', '8.76h/year', "
            "'4.38h/year', '52min/year', '5.26min/year'. Above each bar, a "
            "soft red cost multiplier annotation: '1×', '2×', '5×', '10×', "
            "'25×'. Y-axis label 'SLA Target', X-axis label '年停機時間 (log "
            "scale)'."
        ),
        "composition": (
            "bar chart centered occupying middle 75%; axes labeled; cost "
            "annotations above bars."
        ),
    },
    {
        "chapter": "02-requirements-sla",
        "filename": "03_throughput_01_curves_concept.png",
        "subject": (
            "A hand-drawn line chart on cream paper showing three overlapping "
            "traffic curves over time. Curve 1 in deep brown, mostly flat "
            "with ±20% variation, labeled '穩態 (容量規劃用 average)'. Curve "
            "2 in warm orange, smooth sine wave, labeled '日週期 (LB + auto-"
            "scale)'. Curve 3 in soft red, mostly low then a sudden tall 10× "
            "spike, labeled '尖峰突發 (預先擴容 + 限流)'. X-axis 'Time', "
            "Y-axis 'QPS'. Legend showing the three curves in upper-right."
        ),
        "composition": (
            "chart centered occupying middle 75%; legend upper-right; axis "
            "labels visible."
        ),
    },
    {
        "chapter": "03-process-app-types",
        "filename": "02_app_type_01_tree_concept.png",
        "subject": (
            "A hand-drawn decision tree diagram on cream paper, top-down. "
            "Root: warm orange filled diamond labeled '主要使用者?'. Three "
            "branches labeled along the connecting lines: '終端消費者', '系統 "
            "B2B', '開發者維運'. Each branch leads to a child warm orange "
            "diamond question: '需相機/定位/推播?', '同步還是異步?', '互動 "
            "還是排程?'. Each child question splits to two cream rectangle "
            "leaves: 'Mobile App' / 'Web App / PWA', 'Web API REST/gRPC' / "
            "'Service / Worker', 'Admin Console' / 'CLI / Cron'."
        ),
        "composition": (
            "top-down tree; root centered at top; three branches fanning "
            "outward; six leaves at the bottom row."
        ),
    },
    {
        "chapter": "04-tech-stack-data",
        "filename": "02_sql_nosql_01_tree_concept.png",
        "subject": (
            "A hand-drawn database selection decision tree on cream paper, "
            "top-down. Root: warm orange filled diamond labeled 'ACID / Join "
            "需要?'. Right '是' branch leads to a large moss green filled "
            "rectangle labeled 'PostgreSQL / MySQL · 90% 系統首選'. Left '否' "
            "branch leads to a warm orange diamond '查詢模式?', which fans out "
            "to seven cream rectangle leaves in a row: 'PK 等值 → Redis / "
            "DynamoDB', '巢狀文件 → MongoDB', '寫多線性擴展 → Cassandra', "
            "'全文搜尋 → Elasticsearch', '多跳關係 → Neo4j', '時序 → "
            "TimescaleDB', '向量 → pgvector / Pinecone'."
        ),
        "composition": (
            "top-down tree; root at top; PostgreSQL emphasized larger; seven "
            "NoSQL leaves in a row at the bottom."
        ),
    },
    {
        "chapter": "04-tech-stack-data",
        "filename": "02_sql_nosql_02_polyglot_concept.png",
        "subject": (
            "A hand-drawn polyglot persistence diagram on cream paper. Top "
            "center: a warm orange rectangle labeled 'App Layer'. Connected "
            "downward by hand-drawn lines to four cream-colored cylinder "
            "(database) icons arranged in a row at the bottom: 'PostgreSQL · "
            "user / order / inventory · ACID 主存儲', 'Redis · session / 排行"
            "榜', 'Elasticsearch · 商品搜尋', 'S3 · 圖片 / 影片 / 文件'."
        ),
        "composition": (
            "App Layer at top center; four cylinders evenly spaced in a row "
            "below, each connected to App by short lines."
        ),
    },
    {
        "chapter": "05-ilities",
        "filename": "02_testability_01_pyramid_concept.png",
        "subject": (
            "A hand-drawn three-tier point-up pyramid on cream paper. Small "
            "top tier filled in soft red labeled 'E2E (5%)'. Middle tier "
            "filled in warm orange labeled 'Integration (15%)'. Wide bottom "
            "tier filled in moss green labeled 'Unit (80%)'. To the right of "
            "each tier, tool labels connected by short leader lines: top → "
            "'Cypress / Selenium', middle → 'Postman / TestContainer', bottom "
            "→ 'Jest / pytest / JUnit'. Bottom caption in soft red: '比例 "
            "倒過來會死 (anti-pattern)'."
        ),
        "composition": (
            "pyramid centered occupying middle 55%; tool labels on the right "
            "side; bottom caption."
        ),
    },
    {
        "chapter": "06-components-patterns",
        "filename": "01_layered_01_three_tier_concept.png",
        "subject": (
            "A hand-drawn three-tier layered architecture diagram on cream "
            "paper. Three stacked horizontal rectangles. Top filled in warm "
            "orange: 'Presentation Layer (UI) · React · Vue · Mobile UI · "
            "渲染 + user input'. Middle in cream: 'Business Logic (BL) · "
            "Service · Use Case · 商業規則 + 流程'. Bottom filled in deep "
            "brown with cream text: 'Data Access Layer (DAL) · Repository · "
            "ORM · DB 操作 + 外部 API'. Solid downward arrows on the right "
            "side: UI → BL → DAL. A soft red dashed arrow on the left "
            "skipping from UI directly to DAL, crossed out with a clear ✗ "
            "and label '禁止直接呼叫'."
        ),
        "composition": (
            "three layers stacked vertically occupying middle 65%; solid "
            "arrows on the right; forbidden red dashed arrow on the left."
        ),
    },
    {
        "chapter": "07-system-architecture",
        "filename": "02_cache_01_patterns_concept.png",
        "subject": (
            "A hand-drawn 2×2 grid on cream paper showing four cache "
            "patterns. Each cell labeled at top with the pattern name and "
            "contains a mini-flowchart with three small nodes: App (warm "
            "orange), Cache (pale peach), DB (cream cylinder). Top-left "
            "'Cache-aside': App reads from Cache (dashed miss arrow), App "
            "fallback reads from DB. Top-right 'Write-through': App → Cache "
            "→ DB (all solid synchronous). Bottom-left 'Write-back': App → "
            "Cache, Cache → DB labeled '異步' (dashed). Bottom-right 'Read-"
            "through': App → Cache → DB, with miss arrow labeled '自動補貨'."
        ),
        "composition": (
            "2×2 grid filling middle 80%; each cell self-contained; subtle "
            "cell borders."
        ),
    },
    {
        "chapter": "07-system-architecture",
        "filename": "03_logging_01_correlation_concept.png",
        "subject": (
            "A hand-drawn UML-style sequence diagram on cream paper with "
            "five vertical lifelines labeled at top: 'User', 'API Gateway', "
            "'Service A', 'Service B', 'Service C'. A note over Gateway "
            "says: '生 correlation_id = abc123'. Horizontal arrows flow left-"
            "to-right with labels: User → Gateway 'request', Gateway → A "
            "'req [abc123]', A → B 'req [abc123]', B → C 'req [abc123]'. "
            "Service C is highlighted in soft red with a note 'ERROR! log "
            "abc123'. Return arrows flow back labeled '500' (red). Each "
            "service has a small log marker '[abc123]'. Bottom caption: "
            "'grep abc123 → 看到完整 trace'."
        ),
        "composition": (
            "five vertical lifelines evenly spaced; arrows flowing across; "
            "correlation IDs visible on every arrow; bottom caption."
        ),
    },
    {
        "chapter": "08-advanced-patterns",
        "filename": "02_es_01_crud_vs_es_concept.png",
        "subject": (
            "A hand-drawn two-column comparison on cream paper. Left column "
            "titled 'CRUD' in cream: a single small table-row icon labeled "
            "'accounts table: id=1, balance=100', with a dashed arrow to a "
            "soft red question mark annotated '無歷史'. Right column titled "
            "'Event Sourcing' in warm orange: a vertical chain of four event "
            "boxes top-to-bottom labeled '+50 Deposit', '+30 Deposit', '-10 "
            "Withdraw', '+30 Deposit', connected by solid down arrows. At "
            "the bottom, a moss green snapshot label 'sum = 100 (with "
            "snapshot 加速)' connected by a dashed line from the last event."
        ),
        "composition": (
            "two equal columns side by side; left compact and minimal, right "
            "with a tall event chain; clear visual contrast."
        ),
    },
    {
        "chapter": "09-case-study",
        "filename": "01_iot_01_architecture_concept.png",
        "subject": (
            "A hand-drawn IoT system architecture diagram on cream paper, "
            "horizontal left-to-right flow. From left: '100k Sensors' (deep "
            "brown cluster icon) → arrow labeled 'MQTT' → 'Mosquitto Broker' "
            "(warm orange box) → 'Ingest Service' (warm orange box). Ingest "
            "fans out into two paths. Upper path: → 'Kafka Topic' (cream "
            "cylinder) → 'Flink Rule Engine' (warm orange) → '告警 SMS / "
            "Email' (pale peach). Lower path: → 'TimescaleDB 歷史' (cream "
            "cylinder) → 'Grafana' (pale peach) → '使用者 / API' (moss green)."
        ),
        "composition": (
            "horizontal flow left-to-right occupying full width; nodes evenly "
            "spaced; protocol labels above arrows."
        ),
    },
    {
        "chapter": "90-appendix",
        "filename": "00_capstone_01_architecture_concept.png",
        "subject": (
            "A hand-drawn Uber Eats system architecture diagram on cream "
            "paper, top-down vertical flow. Top tier: 'Mobile / Web Clients' "
            "(deep brown box). Below: 'CDN + Edge' (pale peach), then 'API "
            "Gateway' (pale peach). Gateway fans out to two warm orange "
            "service boxes: 'Order Svc' (left) and 'Driver Svc' (right). "
            "Order Svc → 'PostgreSQL' (cream cylinder). Driver Svc → 'Redis "
            "Geo' (cream cylinder). Both services → 'Kafka' (cream cylinder, "
            "centered). Kafka fans out to three warm orange service boxes: "
            "'Match Svc', 'Notify Svc', 'Analytics'."
        ),
        "composition": (
            "top-down vertical flow; clients at top, services in middle, "
            "storage interspersed; clear hierarchical layers."
        ),
    },
]


def build_prompt(item):
    return f"{item['subject']} Composition: {item['composition']} {STYLE_BLOCK}"


def main():
    from openai import OpenAI

    if not os.getenv("OPENAI_API_KEY"):
        print("ERROR: OPENAI_API_KEY not found", file=sys.stderr)
        sys.exit(1)

    client = OpenAI()
    total = len(IMAGES)
    print(f"準備生成 {total} 張風格化 diagram 圖（16:9, low quality）", flush=True)
    print(f"輸出根目錄: {ROOT}\n", flush=True)

    succeeded = []
    skipped = []
    failed = []

    for idx, item in enumerate(IMAGES, 1):
        outdir = ROOT / item["chapter"]
        outdir.mkdir(parents=True, exist_ok=True)
        outfile = outdir / item["filename"]

        prefix = f"[{idx:02d}/{total}] {item['chapter']}/{item['filename']}"

        if outfile.exists():
            print(f"{prefix}  SKIP (已存在)", flush=True)
            skipped.append(str(outfile))
            continue

        prompt_text = build_prompt(item)
        t0 = time.time()
        try:
            result = client.images.generate(
                model="gpt-image-2",
                prompt=prompt_text,
                size="1536x1024",
                quality="low",
                n=1,
            )
            png_bytes = base64.b64decode(result.data[0].b64_json)
            outfile.write_bytes(png_bytes)
            elapsed = time.time() - t0
            size_kb = outfile.stat().st_size // 1024
            print(f"{prefix}  OK  ({elapsed:.1f}s, {size_kb}KB)", flush=True)
            succeeded.append(str(outfile))
        except Exception as e:
            elapsed = time.time() - t0
            print(f"{prefix}  FAIL ({elapsed:.1f}s): {e}", flush=True)
            failed.append((str(outfile), str(e)))

    print("\n" + "=" * 60)
    print(f"完成。成功 {len(succeeded)} · 略過 {len(skipped)} · 失敗 {len(failed)}")
    if failed:
        print("\n失敗清單：")
        for path, err in failed:
            print(f"  - {path}")
            print(f"    {err}")


if __name__ == "__main__":
    main()
