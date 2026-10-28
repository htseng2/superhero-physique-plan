// ============================================================================
// SUPERHERO PHYSIQUE PLAN — CORE DATA & STATE ENGINE
// ============================================================================

const STORAGE_KEYS = {
  HISTORY: 'superhero_workout_history_v1',
  ACTIVE_DRAFT: 'superhero_active_draft_v1',
  BODYWEIGHT: 'superhero_bodyweight_v1',
  MACROS: 'superhero_macros_v1',
  SETTINGS: 'superhero_settings_v1'
};

const PHOTO_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';

const EXERCISE_MEDIA = {
  warmup_couch: {
    gif: './assets/gifs/warmup_couch.gif',
    photoFolder: 'Intermediate_Hip_Flexor_and_Quad_Stretch',
    muscles: 'Iliopsoas (Hip Flexors) • Rectus Femoris | 髂腰肌（髖屈肌）・股直肌',
    biomechanics: 'Decompresses anterior pelvic pull on lumbar vertebrae before lower-body loading or pickleball. | 解除緊繃髖屈肌對腰椎的往前拉扯，在練腿與打匹克球前先為下背減壓。'
  },
  warmup_9090: {
    gif: './assets/gifs/warmup_9090.gif',
    photoFolder: 'Seated_Glute',
    muscles: 'Deep Hip External & Internal Rotators • Hip Capsule | 深層髖內外旋肌群・髖關節囊',
    biomechanics: 'Restores hip joint capsule rotation so lateral court cuts and deep leg presses never torque the lower back. | 打開髖關節囊內外旋活動度，避免匹克球急停轉身或深蹲腿推時由腰椎代償扭轉。'
  },
  warmup_birddog: {
    gif: './assets/gifs/warmup_birddog.gif',
    photoFolder: 'Superman',
    muscles: 'Multifidus • Transverse Abdominis • Gluteus Maximus | 多裂肌・腹橫肌・臀大肌',
    biomechanics: 'Dr. Stuart McGill\'s gold-standard spine stabilizer—activates 360° core stiffness with near-zero disc compression. | 脊椎權威 McGill 博士黃金護腰動作——在近乎零椎間盤壓迫下啟動 360° 深層核心剛性。'
  },
  u1_incline_press: {
    gif: './assets/gifs/u1_incline_press.gif',
    photoFolder: 'Leverage_Incline_Chest_Press',
    muscles: 'Clavicular Pectoralis Major (Upper Chest) • Anterior Delts • Triceps | 胸大肌鎖骨部（上胸）・前三角肌・三頭肌',
    biomechanics: 'Squares off the high "Superman" upper-chest shelf while fixed lever path eliminates shoulder joint instability. | 打造如超人般飽滿方正的「上胸視覺厚度」，固定軌跡能完全消除肩關節不穩定。'
  },
  u1_neutral_pulldown: {
    gif: './assets/gifs/u1_neutral_pulldown.gif',
    photoFolder: 'Close-Grip_Front_Lat_Pulldown',
    muscles: 'Iliac & Thoracic Latissimus Dorsi • Teres Major | 背闊肌（下側髂骨部與胸椎部）・大圓肌',
    biomechanics: 'Neutral grip aligns the humerus in the sagittal plane to bias lower-lat sweep and V-taper flare. | 對握讓上臂保持在矢狀面往下拉，集中刺激下背闊肌外展線條、撐開倒三角寬度。'
  },
  u1_converging_flat_press: {
    gif: './assets/gifs/u1_converging_flat_press.gif',
    photoFolder: 'Leverage_Chest_Press',
    muscles: 'Sternal Pectoralis Major • Triceps Brachii | 胸大肌胸骨部（中胸）・肱三頭肌',
    biomechanics: 'Converging arms match natural pec fiber line of pull, allowing safe 0 RIR training with full back pad support. | 內聚式軌跡完全契合胸肌纖維收縮方向，搭配椅背全面支撐可安全推至完全力竭（0 RIR）。'
  },
  u1_chest_supp_row: {
    gif: './assets/gifs/u1_chest_supp_row.gif',
    photoFolder: 'Leverage_Iso_Row',
    muscles: 'Mid/Lower Lats • Rhomboids • Middle Trapezius | 中下背闊肌・菱形肌・中斜方肌',
    biomechanics: 'Chest pad absorbs 100% of horizontal torso load, eliminating lumbar shear stress completely. | 胸前靠墊100%承接軀幹水平負荷，徹底消除下背腰椎的水平剪力與拉傷風險。'
  },
  u1_cable_lat_raise: {
    gif: './assets/gifs/u1_cable_lat_raise.gif?v=2',
    photoFolder: 'One-Arm_Side_Laterals',
    muscles: 'Lateral Deltoid (Unilateral — Bilateral Deficit Advantage) | 三角肌中束（單手孤立 — 雙側赤字神經優勢）',
    biomechanics: 'Single-arm execution recruits 5–12% more high-threshold motor units while your free hand braces on the post for zero spine sway. | 單手操作能多徵召 5–12% 高門檻運動單位（力量更大），另一手抓柱子固定軀幹可確保腰椎零晃動。'
  },
  u1_bayesian_preacher_curl: {
    gif: './assets/gifs/u1_bayesian_preacher_curl.gif?v=2',
    photoFolder: 'Standing_One-Arm_Cable_Curl',
    muscles: 'Biceps Brachii (Proximal Long-Head Peak) • Brachialis | 肱二頭肌（長頭肌峰）・肱肌',
    biomechanics: 'Unilateral behind-the-back setup aligns the cable directly with your humerus while your free hand braces on the upright frame. | 單手背後滑輪讓纜繩完美對齊上臂軌跡，在肩伸展位置極大化拉伸二頭長頭；空著的手扶柱防止甩腰。'
  },
  u1_overhead_tri_ext: {
    gif: './assets/gifs/u1_overhead_tri_ext.gif?v=2',
    photoFolder: 'Cable_One_Arm_Tricep_Extension',
    muscles: 'Triceps Brachii (Lateral & Medial Heads — Unilateral) | 肱三頭肌（外側頭與內側頭 — 單手孤立）',
    biomechanics: 'Single-arm cross-body cable line of pull on the same tower eliminates backward lumbar hyperextension torque. | 在同一座單邊滑輪斜向跨體下壓，完全消除雙手過頭時常見的下背折腰（過度伸展）壓力。'
  },
  l1_seated_leg_curl: {
    gif: './assets/gifs/l1_seated_leg_curl.gif',
    photoFolder: 'Seated_Leg_Curl',
    muscles: 'Semitendinosus • Semimembranosus • Biceps Femoris | 半腱肌・半膜肌・股二頭肌（腿後側肌群）',
    biomechanics: 'Done 1st to cushion the knee joint + 1.5× hamstring growth (Maeo 2020). Keeping torso glued to reclined pad avoids sciatic nerve slump tension. | 放第一動作先讓膝蓋充血並提供 1.5 倍腿後側成長（Maeo 2020）。屁股與上背死死貼緊微仰靠墊，避免駝背前傾拉扯坐骨神經。'
  },
  l1_leg_extension: {
    gif: './assets/gifs/l1_leg_extension.gif',
    photoFolder: 'Leg_Extensions',
    muscles: 'Rectus Femoris • Vastus Lateralis • Vastus Medialis (VMO) | 股直肌・股外側肌・股內側肌（水滴肌）',
    biomechanics: 'Reclining the backrest to 105°–110° stretches the biarticular rectus femoris for superior center-quad sweep (Larsen 2024) and pre-fatigues quads. | 椅背微仰 105°–110° 可拉伸跨雙關節的「股直肌」（Larsen 2024 實證提升大腿正中央飽滿度），並預先疲勞股四頭肌以減輕後續腿推對腰椎的負荷。'
  },
  l1_single_leg_press: {
    gif: './assets/gifs/l1_single_leg_press.gif',
    photoFolder: 'Leg_Press',
    muscles: 'Quadriceps Sweep • Gluteus Maximus | 股四頭肌全束・臀大肌',
    biomechanics: 'Resting non-working foot on the floor locks pelvic tilt and prevents lower-back rounding ("butt wink") completely. | 非訓練腳踩穩地面能鎖死骨盆角度，100% 防止雙腿腿推底部常見的「骨盆後傾（屁股眨眼）」傷腰風險。'
  },
  l1_leg_press_calf: {
    gif: './assets/gifs/l1_leg_press_calf.gif',
    photoFolder: 'Calf_Press_On_The_Leg_Press_Machine',
    muscles: 'Gastrocnemius • Intrinsic Foot Arch Stabilizers | 腓腸肌（小腿肚）・足弓深層穩定肌群',
    biomechanics: 'Straight-knee stretch + bottom-half lengthened partials yield 2.2× gastrocnemius hypertrophy (Kassiano 2023) with 0 axial spine load. | 直膝拉伸搭配力竭後「底部半程組」可創造 2.2 倍小腿肌肥大（Kassiano 2023），且脊椎軸向壓迫為零。'
  },
  l1_pallof_press: {
    gif: './assets/gifs/l1_pallof_press.gif',
    photoFolder: 'Pallof_Press',
    muscles: 'Transverse Abdominis • Internal & External Obliques | 腹橫肌（天然束腹帶）・腹內外斜肌',
    biomechanics: 'Isometric anti-rotation tightens the "corset" waist muscles while reinforcing lumbar disc stability. | 等長抗旋轉張力能收緊深層腹橫肌（縮小腰圍視覺），同時強化腰椎椎間盤的抗扭轉穩定度。'
  },
  u2_upper_back_row: {
    gif: './assets/gifs/u2_upper_back_row.gif',
    photoFolder: 'Leverage_High_Row',
    muscles: 'Upper Back (Rhomboids, Mid/Lower Traps, Rear Delts) | 上背肌群（菱形肌、中下斜方肌、後三角肌）',
    biomechanics: '45°–60° elbow path drives scapular retraction/protraction to build 3D upper-back thickness with sternum support. | 手肘外展 45°–60° 帶動肩胛骨完整前引與後收，在胸墊完全支撐護腰下打造 3D 上背立體厚度。'
  },
  u2_converging_incline_press: {
    gif: './assets/gifs/u2_converging_incline_press.gif',
    photoFolder: 'Incline_Cable_Chest_Press',
    muscles: 'Clavicular Pectoralis Major • Anterior Deltoid | 胸大肌鎖骨部（上胸）・前三角肌',
    biomechanics: '25°–30° converging arc maximizes clavicular fiber shortening without anterior shoulder impingement. | 25°–30° 內聚式推舉弧線能完美貼合上胸纖維收縮，同時避免過高角度造成的肩夾擠。'
  },
  u2_neutral_pulldown: {
    gif: './assets/gifs/u2_neutral_pulldown.gif',
    photoFolder: 'Underhand_Cable_Pulldowns',
    muscles: 'Latissimus Dorsi (Lower Iliac Sweep) • Biceps | 背闊肌（下背闊弧線）・肱二頭肌',
    biomechanics: 'Supinated/neutral grip keeps elbows tucked forward in the sagittal plane for maximum lower-lat leverage. | 反握或對握能讓手肘自然收在身體前側，提供下背闊肌最強的機械力矩。'
  },
  u2_pec_deck_fly: {
    gif: './assets/gifs/u2_pec_deck_fly.gif',
    photoFolder: 'Butterfly',
    muscles: 'Pectoralis Major (Sternal & Clavicular Heads) | 胸大肌（中胸與上胸橫向內收）',
    biomechanics: 'Pure horizontal adduction removes the triceps bottleneck and loads the pecs across their entire contractile range. | 純水平內收動作能跳過三頭肌力竭的限制，讓胸大肌在完整拉伸與收縮行程中承受最大張力。'
  },
  u2_machine_lat_raise: {
    gif: './assets/gifs/u2_machine_lat_raise.gif',
    photoFolder: 'Seated_Side_Lateral_Raise',
    muscles: 'Lateral Deltoid (Capped 3D Shoulder Width) | 三角肌中束（打造寬闊圓潤側肩）',
    biomechanics: 'Arm pads apply resistance directly above the elbow, removing wrist/grip involvement for pure lateral delt isolation. | 阻力墊直接施力於手肘上方，徹底排除手腕與小臂代償，100% 孤立轟炸肩中束。'
  },
  l2_hip_thrust: {
    gif: './assets/gifs/l2_hip_thrust.gif',
    photoFolder: 'Barbell_Hip_Thrust',
    muscles: 'Gluteus Maximus • Hamstrings | 臀大肌・腿後側肌群',
    biomechanics: 'Top-half "Kas" ROM (~45° hip hinge to full lockout) maximizes glute leverage while preventing bottom-range pelvic tuck. | 採用上半程「Kas 臀推」行程（只下放約 45° 即推起鎖死），鎖定臀肌力矩最強區間，完全杜絕底部折腰與骨盆翻轉。'
  },
  l2_lying_leg_curl: {
    gif: './assets/gifs/l1_seated_leg_curl.gif',
    photoFolder: 'Seated_Leg_Curl',
    muscles: 'Hamstrings (Lengthened Hip-Flexed Position) | 腿後側肌群（屈髖拉伸位）',
    biomechanics: 'Keeping pelvis & upper back glued flat to the reclined backrest (no forward slump!) delivers 1.5× hamstring growth with zero sciatic nerve tension. | 屁股與上背死死貼緊後仰椅背（嚴禁駝背前傾！），在零坐骨神經拉扯下獲得比趴姿腿後勾高 1.5 倍的肌肥大效果。'
  },
  l2_single_leg_press_high: {
    gif: './assets/gifs/l2_single_leg_press_high.gif',
    photoFolder: 'Narrow_Stance_Leg_Press',
    muscles: 'Gluteus Maximus • Hamstrings • Quadriceps | 臀大肌・腿後腱・股四頭肌',
    biomechanics: 'High foot placement increases hip flexion moment and reduces knee flexion angle—zero anterior knee shear. | 腳踩踏板高位能增加髖關節屈曲力矩並減小膝蓋彎曲角度——膝關節前側零剪力、臀腿同步發展。'
  },
  l2_seated_calf_raise: {
    gif: './assets/gifs/l2_seated_calf_raise.gif',
    photoFolder: 'Seated_Calf_Raise',
    muscles: 'Soleus • Posterior Tibialis (Flat-Foot Arch Support) | 比目魚肌・脛後肌（扁平足足弓支撐關鍵）',
    biomechanics: '90° bent knee slackens the gastrocnemius to isolate the soleus and deep arch-supporting posterior tibialis. | 屈膝 90° 會讓表層腓腸肌放鬆，專門強化深層「比目魚肌」與撐起扁平足足弓的「脛後肌腱」。'
  },
  l2_seated_hip_abduction: {
    gif: './assets/gifs/l2_seated_hip_abduction.gif',
    photoFolder: 'Thigh_Abductor',
    muscles: 'Gluteus Medius • Gluteus Minimus • TFL | 臀中肌・臀小肌・闊筋膜張肌',
    biomechanics: 'Strengthens lateral hip stabilizers to stop inward knee valgus (flat-foot pronation) and absorb pickleball lunges. | 強化側向骨盆穩定肌群，防止扁平足引起的膝蓋內扣（Valgus），並吸收匹克球跨步救球的側向衝擊。'
  },
  d5_fresh_lat_raise: {
    gif: './assets/gifs/d5_fresh_lat_raise.gif?v=2',
    photoFolder: 'One-Arm_Side_Laterals',
    muscles: 'Lateral Deltoid (Unilateral 3rd Weekly Hit) | 三角肌中束（每週第3次單手滿血強化）',
    biomechanics: 'Performed 1st on Saturday one arm at a time when CNS motor unit recruitment is 100% fresh for maximum V-taper shoulder width. | 週六全場第一動作！趁中樞神經 100% 滿血時單手孤立訓練，最大化倒三角側肩視覺寬度。'
  },
  u2_rear_delt_fly: {
    gif: './assets/gifs/u2_rear_delt_fly.gif?v=2',
    photoFolder: 'Reverse_Machine_Flyes',
    muscles: 'Posterior Deltoid • Infraspinatus • Teres Minor | 後三角肌・棘下肌・小圓肌（外旋袖肌群）',
    biomechanics: '45° arm path with chest support isolates the posterior deltoid to complete the 3D shoulder cap from the side. | 胸口貼墊搭配 45° 外展軌跡，精準孤立後三角肌，打造從側面看過去的 3D 立體圓肩。'
  },
  u2_rear_delt_fly_b: {
    gif: './assets/gifs/u2_rear_delt_fly.gif?v=2',
    photoFolder: 'Reverse_Machine_Flyes',
    muscles: 'Posterior Deltoid • Infraspinatus • Teres Minor | 後三角肌・棘下肌・小圓肌',
    biomechanics: '1st of 2 weekly direct rear-delt sessions—chest pad eliminates spinal load while capping the back of the shoulder. | 每週 2 次後三角直接訓練的第 1 次——胸墊徹底消除脊椎負擔，填滿肩膀後側立體度。'
  },
  d5_preacher_curl: {
    gif: './assets/gifs/d5_preacher_curl.gif?v=2',
    photoFolder: 'Machine_Preacher_Curls',
    muscles: 'Biceps Brachii (Distal Short Head) • Brachialis | 肱二頭肌（遠端短頭）・肱肌厚度',
    biomechanics: 'Pad locks humerus in front of torso to target distal lower-bicep & brachialis thickness (Pedrosa 2023). | 牧師椅靠墊將上臂固定於軀幹前方，專攻靠近手肘處的「遠端二頭肌」與「肱肌」飽滿度（Pedrosa 2023 實證與背後彎舉互補）。'
  },
  d5_overhead_tri: {
    gif: './assets/gifs/d5_overhead_tri.gif?v=2',
    photoFolder: 'Cable_Incline_Triceps_Extension',
    muscles: 'Triceps Brachii (Long Head — +40% Growth) | 肱三頭肌長頭（+40% 肌肥大優勢）',
    biomechanics: 'Seated against a 70°–80° incline bench (or single-arm braced on post) blocks lumbar arching while stretching the biarticular long head (Maeo 2022). | 背靠 70°–80° 上斜椅（或單手扶柱）能完全封鎖下背折腰代償，同時在過頭拉伸位創造 +40% 三頭長頭成長（Maeo 2022）。'
  },
  d5_bayesian_curl_ss: {
    gif: './assets/gifs/d5_bayesian_curl_ss.gif?v=2',
    photoFolder: 'Standing_One-Arm_Cable_Curl',
    muscles: 'Biceps Brachii (Unilateral Long-Head Peak) | 肱二頭肌長頭（單手拉伸肌峰）',
    biomechanics: 'Single-arm behind-the-back cable tension from full shoulder extension to peak elbow flexion with free-hand post bracing. | 單手背後滑輪在肩後伸位置拉滿二頭長頭張力，另一手扶柱固定核心，安全榨乾手臂泵感。'
  },
  u2_cable_triceps_ext: {
    gif: './assets/gifs/u2_cable_triceps_ext.gif?v=2',
    photoFolder: 'Cable_One_Arm_Tricep_Extension',
    muscles: 'Triceps Brachii (Unilateral Lateral & Medial Heads) | 肱三頭肌（單手外側馬蹄鐵與內側頭）',
    biomechanics: 'Single-arm cross-body extension biases the lateral horseshoe and medial head at full lockout on the same single pulley. | 在同一座單邊滑輪斜向跨體完全伸直鎖死，強化三頭肌外側馬蹄鐵與內側頭線條。'
  },
  d5_deadbug_core: {
    gif: './assets/gifs/d5_deadbug_core.gif',
    photoFolder: 'Dead_Bug',
    muscles: 'Rectus Abdominis (6-Pack) • Transverse Abdominis | 腹直肌（六塊肌）・深層腹橫肌',
    biomechanics: 'Loads the rectus abdominis via intense anti-extension tension while keeping the lumbar spine pressed flat and safe. | 透過強烈的「抗伸展（抗折腰）」張力精準刺激六塊腹直肌，全程保持下背平貼地面、零椎間盤擠壓。'
  }
};

const WARMUP_PROTOCOL = [
  {
    id: 'warmup_couch',
    name: '1. Half-Kneeling Couch / Psoas Stretch (半跪姿沙發髂腰肌伸展)',
    prescription: '2 × 45s / side (每邊45秒)',
    timerSeconds: 45,
    cue: '⚙️ Setup/設定: Back knee against wall/bench pad, front foot planted at 90°. 後膝頂住牆角或椅墊，前腳踩地呈90°。\n🔥 Mobility/效益: Releases tight iliopsoas & rectus femoris pulling anteriorly on lumbar vertebrae. 解開緊繃髂腰肌與股直肌對腰椎的往前拉扯。\n🛡️ Safety/防傷: Squeeze glute of kneeling leg & tuck ribs down—NEVER arch lower back to lean upright! 用力夾緊跪地側屁股、肋骨下壓，嚴禁折腰挺肚！'
  },
  {
    id: 'warmup_9090',
    name: '2. Seated 90/90 Hip Capsule Switches (坐姿 90/90 髖關節內外旋轉換)',
    prescription: '2 × 8 slow reps / side (每邊慢速8下)',
    timerSeconds: 60,
    cue: '⚙️ Setup/設定: Sit on floor w/ both knees bent at 90° angles; keep chest tall. 坐姿雙膝皆彎曲呈90°，抬頭挺胸保持脊椎中立。\n🔥 Mobility/效益: Lubricates deep hip joint capsule (internal & external rotation) for pickleball pivots & deep leg presses. 打開髖關節囊內外旋活動度，釋放骨盆活動空間。\n🛡️ Safety/防傷: Rotate from the hip sockets while keeping lower back flat (prevents "butt wink" pelvic tuck). 由髖關節球窩帶動翻轉，保持下背挺直不駝背代償。'
  },
  {
    id: 'warmup_birddog',
    name: '3. McGill Bird-Dog (McGill 鳥狗式核心穩定)',
    prescription: '2 × 5 reps / side • 5s hold (每邊5下・停頓5秒)',
    timerSeconds: 50,
    cue: '⚙️ Setup/設定: Hands under shoulders, knees under hips, neutral flat spine. 四足跪姿，手在肩下、膝在髖下，腰背平直如桌面。\n🔥 Core Activation/效益: Make a fist & push opposite heel straight back toward wall (hold 5s) to fire multifidus & 360° core corset. 對側手握拳前伸、腳跟往後牆水平蹬直停5秒，喚醒多裂肌與360°深層核心。\n🛡️ Safety/防傷: Push heel BACK, never kick HIGH (kicking above hip level arches and pinches the lumbar spine). 腳跟「往後延伸」而非「往上踢高」，確保腰椎零凹陷折腰。'
  }
];

const WORKOUT_PLAN = {
  upper1: {
    id: 'upper1',
    shortTitle: 'Upper A',
    dayLabel: 'Monday 週一',
    title: 'Upper A: Chest, Lats & Arms (上肢 A：胸、背闊與手臂)',
    subtitle: 'Heavy Upper-Shelf Pressing, Vertical/Horizontal Lat Pulls & Stretch Arm Feeder | 大重量上胸推、垂直/水平背闊肌下拉划船、二三頭拉伸超級組',
    needsLowerWarmup: false,
    exercises: [
      {
        id: 'u1_incline_press',
        name: '1. Plate-Loaded Incline Chest Press (掛片式上斜胸推)',
        sets: 3,
        repRange: '6–8',
        minReps: 6,
        maxReps: 8,
        restSeconds: 180,
        restLabel: '3 min',
        targetRir: '1–2 RIR',
        badge: 'Clavicular Shelf • Upper Horns First | 鎖骨上胸厚度・優先掛上方掛角',
        cue: '⚙️ Setup/設定: Seat so handles align w/ upper chest (clavicle); load upper horns first. 調座椅讓握把對齊鎖骨上胸；槓片優先掛上方掛角。\n🔥 Hypertrophy/肌肥大: Tuck elbows 45° (arrow shape); 3s slow lower to deep pec stretch, drive up without locking out elbows. 手肘內收45°呈箭頭狀；3秒慢放至上胸深層拉伸，推起時手肘微彎不鎖死。\n📈 Overload/超負荷: Hit 8 reps on all 3 sets @ 1–2 RIR → +2.5kg next week. 三組皆滿8下(保留1-2下)→下次+2.5kg。\n🛡️ Safety/防傷: Keep shoulder blades & glutes pinned to pad; never flare elbows 90° or arch lower back. 肩胛骨與屁股貼死椅背；嚴禁手肘外開90°或折腰代償。'
      },
      {
        id: 'u1_neutral_pulldown',
        name: '2. Neutral-Grip Lat Pulldown (對握滑輪下拉)',
        sets: 3,
        repRange: '6–8',
        minReps: 6,
        maxReps: 8,
        restSeconds: 150,
        restLabel: '2.5 min',
        targetRir: '1 RIR',
        badge: 'Use Lifting Straps • V-Taper Iliac Flare | 必戴拉力帶・倒三角下背闊外展',
        cue: '⚙️ Setup/設定: Shoulder-width neutral handles; ALWAYS wear lifting straps; lock thighs under pad. 與肩同寬對握把、必綁拉力帶、大腿卡緊靠墊。\n🔥 Hypertrophy/肌肥大: Slight 10° torso lean back; pull elbows down & forward toward hips, 1s squeeze, 3s stretch all the way up. 身體微後傾10°，手肘貼身往骨盆方向下壓夾緊1秒，3秒慢放讓背闊肌完全拉伸。\n📈 Overload/超負荷: Hit 8 clean reps × 3 sets → +2.5kg next session. 三組皆滿8下標準動作→下次加重。\n🛡️ Safety/防傷: Do not yank with lower-back momentum or shrug traps toward ears. 嚴禁甩腰後仰借力或聳肩代償。'
      },
      {
        id: 'u1_converging_flat_press',
        name: '3. Converging Machine Chest Press (內聚式器械平胸推)',
        sets: 2,
        repRange: '8–10',
        minReps: 8,
        maxReps: 10,
        restSeconds: 120,
        restLabel: '2 min',
        targetRir: '0 RIR',
        badge: 'Sternal Fibers • Full Back Support | 中胸厚實度・背部貼緊靠墊',
        cue: '⚙️ Setup/設定: Handles at mid-chest (nipple line); retract scapula into flat backrest. 座椅調至握把對齊中胸乳頭線，肩胛後收貼緊椅背。\n🔥 Hypertrophy/肌肥大: Press inward along converging arc; pause 1s at deep stretch, push Set 2 to true 0 RIR failure. 沿內聚弧線推起並想像雙手手肘內夾；底部拉伸停1秒，第2組安全推到力竭(0 RIR)。\n📈 Overload/超負荷: Hit 10 reps on both sets → +2.5–5kg. 兩組皆達10下→下次加2.5–5kg。\n🛡️ Safety/防傷: Keep head, upper back & glutes glued to pad; do not let shoulders roll forward at the bottom. 頭、上背、屁股全程貼緊靠墊，底部肩膀不可前引聳起。'
      },
      {
        id: 'u1_chest_supp_row',
        name: '4. Chest-Supported Neutral Row (胸靠墊對握器械划船)',
        sets: 3,
        repRange: '8–10',
        minReps: 8,
        maxReps: 10,
        restSeconds: 120,
        restLabel: '2 min',
        targetRir: '1 RIR',
        badge: 'Use Lifting Straps • Zero Lower Back Load | 必戴拉力帶・腰椎零剪力負擔',
        cue: '⚙️ Setup/設定: Chest pad set so sternum is firmly supported; neutral grip w/ lifting straps. 胸墊高度對齊胸骨下緣並貼緊；對握並綁緊拉力帶。\n🔥 Hypertrophy/肌肥大: Let lats stretch forward at start, then drive elbows low & back toward hips (sagittal plane) for lower-lat thickness. 起始讓背闊往前完全拉開，接著手肘貼身往後下方骨盆方向拉到底停1秒。\n📈 Overload/超負荷: Hit 10 reps × 3 sets without chest leaving pad → +2.5–5kg. 三組滿10下且胸口不離墊→下次加重。\n🛡️ Safety/防傷: Keep sternum glued to pad 100% of the time (zero lower-back hyperextension or shear). 胸口全程死貼靠墊（徹底消除腰椎剪力與挺腰借力）。'
      },
      {
        id: 'u1_cable_lat_raise',
        name: '5. Single-Arm Cross-Body Cable Lateral Raise (單手跨體滑輪側平舉)',
        sets: 3,
        repRange: '10–15/arm',
        minReps: 10,
        maxReps: 15,
        restSeconds: 60,
        restLabel: '60s',
        targetRir: '0 RIR',
        badge: 'Unilateral Hit #1 of 3 • Free Hand Braced on Post | 單手側肩 #1/3・另一手扶柱穩固核心',
        cue: '⚙️ Setup/設定: Pulley at wrist height (max bottom tension); stand 1 step away, hold tower post w/ free hand. 滑輪調至手腕高度（最大化起始張力）；側站一步，非訓練手抓緊柱子。\n🔥 Hypertrophy/肌肥大: Sweep arm out & 30° forward (scapular plane) to shoulder level; 2s eccentric. Final set: 0 RIR + 4 bottom-half lengthened partials! 手臂前傾30°沿肩胛平面往遠方抬至平肩，2秒慢放；最後一組力竭後接4下底部半程組！\n📈 Overload/超負荷: Add 1 rep/set weekly until hitting 15 reps × 3 sets → move pin down 1 plate. 每週加1下直到三組滿15下再升一格重量（側肩先求標準不求重）。\n🛡️ Safety/防傷: Lead with elbow/pinky side without internal rotation; brace on post so torso never sways. 手肘微彎帶領、勿內旋肩膀夾擠；扶緊柱子嚴禁甩身體借力。'
      },
      {
        id: 'u1_bayesian_preacher_curl',
        name: '6A. [Superset] Single-Arm Behind-the-Back Cable Curl (超級組：單手背後滑輪二頭彎舉)',
        sets: 2,
        repRange: '10–12/arm',
        minReps: 10,
        maxReps: 12,
        restSeconds: 45,
        restLabel: '45s',
        targetRir: '0 RIR',
        badge: 'Unilateral Proximal Bicep Peak • Superset w/ 6B | 單手二頭長頭肌峰・與 6B 超級組',
        cue: '⚙️ Setup/設定: Single low pulley; face away & step 1–2 feet forward so arm is drawn ~30° behind torso; brace free hand on frame. 低位滑輪背對站立並往前跨1-2步，讓手臂自然向後延伸約30°；另一手扶柱固定。\n🔥 Hypertrophy/肌肥大: Pin elbow behind hip line; curl up, then lower 3s all the way to full stretched bicep extension. 手肘釘在身體中線後方不前移，彎舉頂峰擠壓後3秒慢放到最底拉伸二頭長頭。\n📈 Overload/超負荷: Hit 12 reps/arm on both sets w/ pinned elbow → +1.25–2.5kg. 兩組皆滿12下且手肘不前跑→下次微幅加重。\n🛡️ Safety/防傷: Free hand braced on post + glutes tight prevents lumbar arching; keep wrist neutral/supinated. 扶柱+夾臀防止下背挺腰；手腕保持中立掌心朝上不折腕。'
      },
      {
        id: 'u1_overhead_tri_ext',
        name: '6B. [Superset] Single-Arm Cross-Body Cable Triceps Extension (超級組：單手跨體滑輪三頭下壓)',
        sets: 2,
        repRange: '10–12/arm',
        minReps: 10,
        maxReps: 12,
        restSeconds: 60,
        restLabel: '60s',
        targetRir: '0 RIR',
        badge: 'Same Single Pulley • Zero Lumbar Extension Torque | 同座單邊滑輪・零折腰風險',
        cue: '⚙️ Setup/設定: Same single cable set to shoulder height; stand sideways ~30° & brace free hand on tower post. 同一座單邊滑輪調至肩膀高度；側身約30°站立，非訓練手抓柱穩定。\n🔥 Hypertrophy/肌肥大: Keep upper arm locked ~30° out from torso; extend across body to full elbow lockout (1s squeeze) + 2s eccentric. 上臂固定在身體斜外側，前臂斜向跨體往下完全伸直鎖死1秒，2秒慢回。\n📈 Overload/超負荷: Hit 12 clean lockouts/arm × 2 sets → add 1 small plate. 兩組滿12下完整鎖死→下次升一格重量。\n🛡️ Safety/防傷: Cross-body angle aligns cable with elbow joint (zero wrist/elbow strain & zero lower-back arch). 斜向跨體軌跡完美對齊手肘關節，手肘零壓力且下背完全不折腰。'
      }
    ]
  },
  lower1: {
    id: 'lower1',
    shortTitle: 'Lower A',
    dayLabel: 'Tuesday 週二',
    title: 'Lower A: Quads, Calves & Core (下肢 A：股四頭、小腿與核心)',
    subtitle: 'Pre-Exhausted Knee & Lumbar Spine Shielded Sequencing | 預先疲勞護膝護腰排序・零軸向脊椎壓迫',
    needsLowerWarmup: true,
    exercises: [
      {
        id: 'l1_seated_leg_curl',
        name: '1. Seated Leg Curl — Done 1st, Back Glued to Pad (坐姿腿後勾 — 首發暖膝・背貼緊靠墊)',
        sets: 3,
        repRange: '10–12',
        minReps: 10,
        maxReps: 12,
        restSeconds: 120,
        restLabel: '2 min',
        targetRir: '0 RIR',
        badge: '1.5× Stretch (Maeo 2020) • NO Forward Slump (Nerve Safe) | 1.5倍肌肥大・嚴禁駝背前傾（保護坐骨神經）',
        cue: '⚙️ Setup/設定: Align knee joint with machine pivot dot; ankle pad just above Achilles; lock thigh pad tight. 膝關節對齊器械轉軸紅點，腳踝墊靠在阿基里斯腱上方，大腿護墊壓緊鎖死。\n🔥 Hypertrophy/肌肥大: Seated hip flexion stretches hamstrings for 1.5× more growth (Maeo 2020); 1s bottom squeeze + 3s slow eccentric. 坐姿屈髖能給予腿後側1.5倍肌肥大；用力下勾停1秒，3秒控制慢放至膝蓋微彎。\n📈 Overload/超負荷: Hit 12 reps × 3 sets w/ back glued to pad → +2.5kg. 三組滿12下且背部不離墊→下次+2.5kg。\n🛡️ Safety/防傷: CRITICAL—Keep pelvis & upper back GLUED flat to reclined pad (100°–105°); NEVER slump forward (prevents sciatic nerve Slump Test pinch)! 關鍵護腰：屁股與上背必須「死死貼平」微仰椅背，嚴禁駝背前傾（防止拉扯坐骨神經根）！'
      },
      {
        id: 'l1_leg_extension',
        name: '2. Leg Extension — Reclined Backrest Pre-Exhaust (微仰靠墊坐姿腿屈伸 — 股四頭預先力竭)',
        sets: 3,
        repRange: '12–15',
        minReps: 12,
        maxReps: 15,
        restSeconds: 90,
        restLabel: '90s',
        targetRir: '0 RIR',
        badge: '105°–110° Reclined Pad (Larsen 2024) • -25% Spine Load | 微仰椅背強化股直肌・減輕後續腿推25%腰椎負荷',
        cue: '⚙️ Setup/設定: Set backrest slightly reclined (105°–110°); knee aligned w/ pivot; shin pad above ankle; grip side handles hard. 椅背調微仰(105°–110°)打開髖部，膝蓋對齊轉軸，雙手抓死兩側握把將屁股壓進椅座。\n🔥 Hypertrophy/肌肥大: Reclined hip angle stretches center-quad rectus femoris (Larsen 2024); hold top lockout 2s, 3s eccentric to full bend. 微仰角度能拉伸大腿正中央「股直肌」提升肥大效果；頂峰完全伸直夾緊2秒，3秒慢放到底。\n📈 Overload/超負荷: Hit 15 reps × 3 sets w/ 2s top hold → +2.5kg. 三組皆滿15下(含頂峰停2秒)→下次+2.5kg。\n🛡️ Safety/防傷: Pre-fatigues quads so your next Leg Press needs 25% less spinal/knee load; never kick explosively. 預先疲勞股四頭肌，讓下一動作腿推減少25%重量也能徹底刺激大腿；切勿用甩踢借力。'
      },
      {
        id: 'l1_single_leg_press',
        name: '3. Single-Leg 45° Leg Press — Mid-Foot (單腿 45° 斜板腿推 — 腳踩踏板中段)',
        sets: 3,
        repRange: '10–12/leg',
        minReps: 10,
        maxReps: 12,
        restSeconds: 90,
        restLabel: '90s',
        targetRir: '1–2 RIR',
        badge: 'Backrest Flat • Tripod Foot • No Belt | 椅背調最平・足底三角踩穩・不繫腰帶',
        cue: '⚙️ Setup/設定: SET BACKREST FLAT (lowest notch). Working foot mid-sled; non-working foot flat on floor; NO weightlifting belt. 椅背調到最平（打開髖角護腰）；訓練腳踩踏板中段，非訓練腳踩穩地面鎖定骨盆；不繫硬腰帶。\n🔥 Hypertrophy/肌肥大: Root Tripod Foot (big toe, pinky toe, heel); lower 3s until thigh is ~90° to torso, drive through mid-foot without locking knee. 足底三角踩穩建立足弓，3秒慢放至舒適最深處（骨盆不翻轉），推起時膝蓋微彎不鎖死。\n📈 Overload/超負荷: Hit 12 reps/leg × 3 sets @ 1–2 RIR → +2.5–5kg. 三組滿12下(保留1-2下餘力)→下次+2.5–5kg。\n🛡️ Safety/防傷: Floor foot locks pelvis so lower back NEVER rounds ("butt wink"); track knee directly over 2nd toe (never cave inward). 踩地腳能100%防止底部骨盆後傾（屁股眨眼傷腰）；膝蓋對準第二腳趾、嚴禁內扣。'
      },
      {
        id: 'l1_leg_press_calf',
        name: '4. Leg Press Calf Extension + Lengthened Partials (腿推機直膝小腿推舉 + 底部半程組)',
        sets: 4,
        repRange: '10–12',
        minReps: 10,
        maxReps: 12,
        restSeconds: 90,
        restLabel: '90s',
        targetRir: '0 RIR',
        badge: '2.2× Calf Growth (Kassiano 2023) • Arch Builder | 2.2倍小腿成長・強化扁平足弓・零脊椎壓迫',
        cue: '⚙️ Setup/設定: Balls of feet on bottom edge of sled; keep Safety Stops ENGAGED; knees 98% straight (soft micro-bend). 前腳掌踩踏板下緣，務必扣上安全插銷；膝蓋保持98%伸直（微彎不死鎖）。\n🔥 Hypertrophy/肌肥大: Pause 2s at deep bottom stretch (kills Achilles bounce), press through big toe ball. Final set: 0 RIR + 5 bottom-half lengthened partials (2.2× calf growth, Kassiano 2023)! 底部深層拉伸停2秒消除肌腱反彈，用大拇趾球推高；最後一組力竭後接5下「底部半程組」（2.2倍小腿成長）！\n📈 Overload/超負荷: Hit 12 full-pause reps × 4 sets → +5kg. 四組皆滿12下(含底部停2秒)→下次+5kg。\n🛡️ Safety/防傷: Zero axial spine compression (unlike standing calf machine); pressing through big toe strengthens flat-foot arch. 脊椎零軸向壓迫（完勝站姿小腿機）；大拇趾發力能強化扁平足弓。'
      },
      {
        id: 'l1_pallof_press',
        name: '5. Standing Cable Pallof Press (站姿滑輪抗旋轉核心推 / Pallof Press)',
        sets: 3,
        repRange: '10–12/side',
        minReps: 10,
        maxReps: 12,
        restSeconds: 60,
        restLabel: '60s',
        targetRir: 'Isometric',
        badge: 'Waist Cinch • Anti-Rotation Spine Armor | 收窄腰圍束腹帶・抗旋轉護腰裝甲',
        cue: '⚙️ Setup/設定: Cable at sternum height; stand sideways w/ feet shoulder-width, knees soft, hands at chest. 滑輪調至胸骨高度，側對滑輪雙腳與肩同寬、膝蓋微彎，雙手握把貼胸前。\n🔥 Hypertrophy/肌肥大: Press hands straight out from sternum, hold 2–3s fighting rotational pull (tightens transverse abdominis "waist corset"), return slowly. 雙手往胸前正前方推直，用力抵抗側拉力停頓2-3秒（強化深層腹橫肌收窄腰圍），慢速收回。\n📈 Overload/超負荷: Hit 12 reps/side w/ zero torso twist (2s hold) → +1.25–2.5kg. 每邊滿12下(停2秒且軀幹零旋轉)→下次升一格重量。\n🛡️ Safety/防傷: Keep ribs stacked over pelvis; builds 360° lumbar anti-rotation armor for pickleball lunges with zero spinal flexion. 肋骨下壓對齊骨盆；在零脊椎彎曲磨損下建立匹克球急停變向的抗旋轉護腰裝甲。'
      }
    ]
  },
  upper2: {
    id: 'upper2',
    shortTitle: 'Upper B',
    dayLabel: 'Thursday 週四',
    title: 'Upper B: Upper Back, Chest & Delts (上肢 B：上背厚度、胸與側後肩)',
    subtitle: 'Transverse Upper-Back Thickness, Stretched Pec Adduction & Side Delt Capping | 立體上背厚度、胸肌水平內收拉伸、3D 側肩與後三角',
    needsLowerWarmup: false,
    exercises: [
      {
        id: 'u2_upper_back_row',
        name: '1. Chest-Supported 45° Upper-Back Row (胸靠墊 45° 開肘上背划船)',
        sets: 3,
        repRange: '8–10',
        minReps: 8,
        maxReps: 10,
        restSeconds: 150,
        restLabel: '2.5 min',
        targetRir: '1 RIR',
        badge: 'Use Straps • Rhomboids, Traps & Rear Delts | 必戴拉力帶・轟炸菱形肌／中下斜方／後三角',
        cue: '⚙️ Setup/設定: Pronated/overhand wide grip w/ lifting straps; sternum pinned firmly to chest pad. 正手寬握並綁拉力帶；胸骨下緣死死貼緊胸墊。\n🔥 Hypertrophy/肌肥大: Flare elbows 45°–60° out from torso; let shoulder blades protract (spread) fully at bottom, then squeeze blades together hard for 1s. 手肘外展45°–60°；底部讓肩胛骨充分往前拉開，向後拉時用力夾緊菱形肌與中下斜方停1秒。\n📈 Overload/超負荷: Hit 10 reps × 3 sets w/ full scapular squeeze → +2.5–5kg. 三組滿10下且肩胛完整夾緊→下次+2.5–5kg。\n🛡️ Safety/防傷: Keep chest glued to pad (never peel sternum off pad to heave weight with lower back). 胸口全程貼死靠墊，嚴禁挺起上半身用下背借力。'
      },
      {
        id: 'u2_converging_incline_press',
        name: '2. Converging Incline Machine Press (內聚式上斜器械胸推 25°–30°)',
        sets: 3,
        repRange: '8–10',
        minReps: 8,
        maxReps: 10,
        restSeconds: 150,
        restLabel: '2.5 min',
        targetRir: '1 RIR',
        badge: '25°–30° Angle • Upper Pec Shelf | 25°–30° 黃金上斜角・飽滿上胸視覺',
        cue: '⚙️ Setup/設定: 25°–30° incline angle; handles aligned w/ clavicular upper chest; shoulder blades retracted. 25°–30°上斜角度，握把對齊鎖骨上胸，肩胛骨後收下壓貼緊椅背。\n🔥 Hypertrophy/肌肥大: Press upward & inward along clavicular fibers; 3s controlled lowering to deep stretch + 1s pause at bottom. 沿上胸纖維往內上方匯聚推起；3秒慢放至底部深層拉伸停1秒再推。\n📈 Overload/超負荷: Hit 10 reps × 3 sets @ 1 RIR → +2.5kg. 三組皆滿10下(保留1下)→下次+2.5kg。\n🛡️ Safety/防傷: Keep glutes & upper back flat on pad; tuck elbows ~45°–60° to protect front shoulder capsule. 屁股與上背貼緊椅背不拱腰；手肘內收45°–60°保護前肩關節囊。'
      },
      {
        id: 'u2_neutral_pulldown',
        name: '3. Underhand / Neutral-Grip Lat Pulldown (反握／對握滑輪下拉)',
        sets: 3,
        repRange: '8–10',
        minReps: 8,
        maxReps: 10,
        restSeconds: 120,
        restLabel: '2 min',
        targetRir: '1 RIR',
        badge: 'Use Lifting Straps • 2nd Weekly Lat Flare | 必戴拉力帶・每週第2次背闊寬度刺激',
        cue: '⚙️ Setup/設定: Shoulder-width neutral or supinated grip w/ lifting straps; thighs locked securely under pad. 與肩同寬對握或反握、必戴拉力帶、大腿卡緊靠墊。\n🔥 Hypertrophy/肌肥大: Keep chest proud; drive elbows down & tucked in front of torso into waist pockets for lower-lat V-taper sweep; 3s eccentric stretch. 胸口微挺，手肘收在身體前側往腰際口袋下壓（主攻下背闊肌弧線），3秒慢放到頂部完全拉伸。\n📈 Overload/超負荷: Hit 10 reps × 3 sets → +2.5kg. 三組皆滿10下→下次+2.5kg。\n🛡️ Safety/防傷: Keep torso stable (<15° lean); never swing lower back to initiate the pull. 軀幹保持穩定（後傾不超過15°），切勿用下背前後搖晃拉動重量。'
      },
      {
        id: 'u2_pec_deck_fly',
        name: '4. Seated Pec Deck / Cable Fly (坐姿蝴蝶機夾胸／滑輪飛鳥)',
        sets: 2,
        repRange: '10–12',
        minReps: 10,
        maxReps: 12,
        restSeconds: 90,
        restLabel: '90s',
        targetRir: '0 RIR',
        badge: 'Pure Horizontal Adduction • 2s Stretch Pause | 純水平胸肌內收・底部拉伸暫停2秒',
        cue: '⚙️ Setup/設定: Seat height so hands/elbows move horizontally at mid-chest level; set rear arm pins 1 notch in front of flat torso line. 座椅調至手肘與中胸同高水平移動；起始銷調在身體平面微前方一格。\n🔥 Hypertrophy/肌肥大: Pure horizontal adduction (bypasses triceps fatigue); pause 2s at stretched open position, squeeze inner biceps together for 1s. 純水平內收孤立胸大肌；張開至拉伸位停頓2秒，向內夾緊時想像把兩手二頭肌內側貼在一起停1秒。\n📈 Overload/超負荷: Hit 12 reps × 2 sets w/ 2s stretch pause → +2.5–5kg. 兩組皆滿12下(含拉伸停2秒)→下次+2.5–5kg。\n🛡️ Safety/防傷: Stop stretch when hands are just in front of torso line—never let arms pull excessively behind your body (protects anterior shoulder capsule). 手退到身體平面微前方即可停住，切勿過度往後拉扯前肩關節囊。'
      },
      {
        id: 'u2_machine_lat_raise',
        name: '5. Machine Lateral Raise (器械側平舉)',
        sets: 3,
        repRange: '12–15',
        minReps: 12,
        maxReps: 15,
        restSeconds: 90,
        restLabel: '90s',
        targetRir: '0 RIR',
        badge: 'Side Delt Hit #2 of 3 • +4 Lengthened Partials | 側肩頻率 #2/3・最後一組加4下底部半程',
        cue: '⚙️ Setup/設定: Align shoulder joint with machine pivot; pads rest against outer upper arms/elbows (relax hands/grip). 肩關節對齊器械轉軸，靠墊頂住上臂外側/手肘上方（手指放鬆不死握）。\n🔥 Hypertrophy/肌肥大: Drive elbows outward to shoulder height (1s pause), 3s lowering. Final set: 0 RIR + 4 bottom-half lengthened partials! 用手肘往兩側抬至肩膀高度停1秒，3秒慢放；最後一組推到力竭後直接加做4下底部半程組！\n📈 Overload/超負荷: Hit 15 reps × 3 sets → +2.5kg (or add 1–2kg micro-weight). 三組皆滿15下→下次微幅加重。\n🛡️ Safety/防傷: Keep traps depressed (push shoulders down away from ears) and torso glued to pad. 全程壓低肩胛骨（不聳肩借力），軀幹貼穩靠墊。'
      },
      {
        id: 'u2_rear_delt_fly_b',
        name: '6. Chest-Supported Rear Delt Fly (胸靠墊蝴蝶機反向飛鳥)',
        sets: 2,
        repRange: '15–20',
        minReps: 15,
        maxReps: 20,
        restSeconds: 60,
        restLabel: '60s',
        targetRir: '0 RIR',
        badge: 'Rear Delt Hit #1 of 2 • 3D Shoulder Cap | 後三角頻率 #1/2・3D 立體圓肩',
        cue: '⚙️ Setup/設定: Face pad w/ sternum flat against cushion; handles just below shoulder height; use neutral/angled grip so elbows flare 45°. 面向靠墊、胸骨貼平軟墊；握把略低於肩膀，採對握或斜握讓手肘自然外展45°。\n🔥 Hypertrophy/肌肥大: Push hands "outward to the walls" in a wide arc (don\'t pinch shoulder blades together early) to isolate rear delts; 2s eccentric. 想像雙手「往兩側牆壁推開」畫大弧線（勿提早夾緊肩胛骨變成練中背），孤立後三角肌打造3D圓肩。\n📈 Overload/超負荷: Progress reps from 15 → 20 across both sets before adding weight. 兩組皆能標準做滿20下再升一格重量。\n🛡️ Safety/防傷: Keep sternum glued to pad (zero lower-back sway) and stop arms at torso line so traps don\'t take over. 胸口死貼靠墊（零腰椎晃動），手臂撥到與身體平行即可停住。'
      }
    ]
  },
  lower2: {
    id: 'lower2',
    shortTitle: 'Lower B',
    dayLabel: 'Friday 週五',
    title: 'Lower B: Glutes, Hamstrings & Hips (下肢 B：臀肌、腿後側與髖關節裝甲)',
    subtitle: 'Zero-Shear Posterior Chain & Pickleball Hip Armor | 零剪力後側鏈（Kas 臀推＋護神經坐姿腿後勾）與匹克球護膝護腰',
    needsLowerWarmup: true,
    exercises: [
      {
        id: 'l2_hip_thrust',
        name: '1. Hip Thrust Machine — Top-Half "Kas" ROM (器械臀推 — 上半程 Kas 護腰練法)',
        sets: 3,
        repRange: '8–12',
        minReps: 8,
        maxReps: 12,
        restSeconds: 135,
        restLabel: '2–2.5m',
        targetRir: '1–2 RIR',
        badge: 'Top-Half ROM • Prevents Bottom Pelvic Tuck | 上半程鎖定臀肌・杜絕底部骨盆翻轉傷腰',
        cue: '⚙️ Setup/設定: Upper back pad right below shoulder blades; feet shoulder-width so shins are vertical (90°) at top lockout. 上背墊靠在肩胛骨下緣；雙腳與肩同寬，確保推到頂點時小腿垂直地面(90°)。\n🔥 Hypertrophy/肌肥大: Top-Half "Kas" ROM—lower hips only ~45° (halfway down), then drive through heels to full horizontal lockout w/ 2s hard glute squeeze (Plotkin 2023). 採用「上半程 Kas 臀推」：下放只降約45°即用腳跟推到水平鎖死並夾緊屁股2秒（鎖定臀大肌最強力矩區間）。\n📈 Overload/超負荷: Hit 12 reps × 3 sets w/ 2s lockout hold → +5kg. 三組皆滿12下(頂峰停2秒)→下次+5kg。\n🛡️ Safety/防傷: Keep chin tucked & ribs down (stare forward, never throw head back); stopping halfway down prevents bottom pelvic tuck & lumbar hyperextension. 全程收下巴、眼神看前方、肋骨下壓；半程下放能100%杜絕底部折腰與骨盆翻轉。'
      },
      {
        id: 'l2_lying_leg_curl',
        name: '2. Seated Leg Curl — Back Glued to Pad, Nerve Safe (坐姿腿後勾 — 背貼緊靠墊護神經)',
        sets: 3,
        repRange: '12–15',
        minReps: 12,
        maxReps: 15,
        restSeconds: 90,
        restLabel: '90s',
        targetRir: '0 RIR',
        badge: '1.5× Growth (Maeo 2020) • NO Forward Lean (Sciatic Safe) | 1.5倍腿後肌肥大・嚴禁前傾（零坐骨神經張力）',
        cue: '⚙️ Setup/設定: Backrest reclined 100°–105°; knee aligned w/ pivot; thigh pad locked tight over quads. 椅背設定微仰100°–105°，膝蓋對齊轉軸，大腿護墊緊壓鎖死。\n🔥 Hypertrophy/肌肥大: Replaces Lying Leg Curl to give 1.5× hamstring growth (Maeo 2020) without prone lumbar facet pinching; 1s squeeze + 3s eccentric. 取代趴姿腿彎舉（消除趴姿骨盆前傾壓迫腰椎，且成長高1.5倍）；底部夾緊1秒、3秒慢放。\n📈 Overload/超負荷: Hit 15 reps × 3 sets w/ strict glued back → +2.5kg. 三組滿15下且背部不離墊→下次+2.5kg。\n🛡️ Safety/防傷: Keep pelvis & upper back GLUED flat to pad (chest proud, neutral spine). NEVER lean/slump forward (zero sciatic nerve tension)! 屁股與上背必須「全程貼死」後仰椅背、抬頭挺胸，絕對不要往前駝背（零坐骨神經張力）！'
      },
      {
        id: 'l2_single_leg_press_high',
        name: '3. Single-Leg 45° Leg Press — High Foot (單腿 45° 斜板腿推 — 腳踩踏板高位)',
        sets: 3,
        repRange: '10–12/leg',
        minReps: 10,
        maxReps: 12,
        restSeconds: 90,
        restLabel: '90s',
        targetRir: '1–2 RIR',
        badge: 'Backrest Flat • High Foot Glute/Quad Drive | 椅背最平・高位踩法強化臀腿且零膝剪力',
        cue: '⚙️ Setup/設定: SET BACKREST FLAT. Working foot placed HIGH on sled; non-working foot flat on floor. 椅背調到最平；訓練腳踩在踏板偏高處，非訓練腳踩穩地面鎖住骨盆。\n🔥 Hypertrophy/肌肥大: High foot placement increases hip flexion moment (glute + hamstring + quad sweep) with less knee bend; 3s lowering, drive through heel/mid-foot. 高位踩法增加髖關節力矩（強化臀腿微笑線）並減少膝蓋彎曲壓力；3秒慢放，用腳跟與足弓推起。\n📈 Overload/超負荷: Hit 12 reps/leg × 3 sets @ 1–2 RIR → +2.5–5kg. 三組滿12下(保留1-2下)→下次+2.5–5kg。\n🛡️ Safety/防傷: Zero anterior knee shear; floor foot locks pelvis so lower back stays 100% flat against pad. 膝蓋前側零剪力；踩地腳鎖死骨盆確保下背100%平貼靠墊不眨眼。'
      },
      {
        id: 'l2_seated_calf_raise',
        name: '4. Seated Calf Raise Machine (坐姿小腿提踵機)',
        sets: 3,
        repRange: '12–15',
        minReps: 12,
        maxReps: 15,
        restSeconds: 60,
        restLabel: '60s',
        targetRir: '0 RIR',
        badge: 'Soleus & Posterior Tibialis (Flat-Foot Fix) | 比目魚肌與脛後肌（扁平足足弓救星）',
        cue: '⚙️ Setup/設定: Balls of feet on platform; knee pad snug just above kneecaps at 90° knee bend. 前腳掌踩踏板邊緣，護墊緊壓膝蓋上方保持屈膝90°。\n🔥 Hypertrophy/肌肥大: 90° bent knee slackens gastrocnemius to isolate deep soleus & arch-supporting posterior tibialis; 2s bottom stretch pause + 1s top squeeze. 屈膝90°能放鬆腓腸肌，專門孤立深層「比目魚肌」與「脛後肌」；底部暫停2秒、頂峰踮高停1秒。\n📈 Overload/超負荷: Hit 15 full-ROM paused reps × 3 sets → +2.5kg. 三組滿15下完整行程(含停頓)→下次+2.5kg。\n🛡️ Safety/防傷: Push through big toe ball to rebuild flat-foot arch and prevent Achilles/plantar fascia strain on pickleball courts. 由大拇趾球發力推起，直接重建扁平足足弓並預防匹克球足底筋膜與阿基里斯腱拉傷。'
      },
      {
        id: 'l2_seated_hip_abduction',
        name: '5. Seated Hip Abduction Machine (坐姿髖外展機)',
        sets: 3,
        repRange: '15–20',
        minReps: 15,
        maxReps: 20,
        restSeconds: 60,
        restLabel: '60s',
        targetRir: '0 RIR',
        badge: 'Glute Medius • Pickleball Impact Shield | 強化臀中肌・防止膝內扣與匹克球衝擊',
        cue: '⚙️ Setup/設定: Sit all the way back with pelvis & spine glued to backrest; outer knee pads set to narrow starting stretch. 屁股坐到底、背部貼緊椅背（勿前傾懸空）；護墊調至最窄起始拉伸位。\n🔥 Hypertrophy/肌肥大: Drive knees wide apart, hold outer contraction 1s, 2s controlled return (targets upper-shelf gluteus medius & minimus). 雙膝往外推開至極限停頓1秒，2秒慢放回程（飽滿上臀外側臀中肌）。\n📈 Overload/超負荷: Hit 20 reps × 3 sets w/ 1s outer hold → +5kg. 三組皆滿20下(外展停1秒)→下次+5kg。\n🛡️ Safety/防傷: Stops flat-foot inward knee cave (valgus) and absorbs lateral pickleball court lunges before shock reaches your lower back. 防止扁平足引起的膝蓋內扣，並吸收匹克球橫向跨步救球的衝擊、保護腰椎。'
      }
    ]
  },
  superman5: {
    id: 'superman5',
    shortTitle: 'Upper C',
    dayLabel: 'Saturday 週六',
    title: 'Upper C: 3D Delts, Arms & Abs (上肢 C：滿血 3D 側後肩、手臂與六塊肌)',
    subtitle: '100% Fresh Neural Drive for Side/Rear Delts, Biceps, Triceps & Anti-Extension Abs (Zero Spine Load) | 100% 滿血中樞神經專攻 3D 肩膀、粗壯二三頭與零折腰六塊肌核心',
    needsLowerWarmup: false,
    exercises: [
      {
        id: 'd5_fresh_lat_raise',
        name: '1. Single-Arm Cable Lateral Raise — Fresh Priority (單手跨體滑輪側平舉 — 滿血首發)',
        sets: 4,
        repRange: '12–15/arm',
        minReps: 12,
        maxReps: 15,
        restSeconds: 60,
        restLabel: '60s',
        targetRir: '0 RIR',
        badge: 'Unilateral Hit #3 of 3 • Peak Unfatigued Drive | 單手側肩 #3/3・中樞神經 100% 滿血首發',
        cue: '⚙️ Setup/設定: Pulley at wrist height; hold post w/ non-working hand; stand 1 step out for max bottom stretch tension. 滑輪調至手腕高；非訓練手抓緊柱子固定身體，側跨一步讓底部即有滿載張力。\n🔥 Hypertrophy/肌肥大: Trained 1st on Saturday when CNS is 100% fresh! Sweep 30° into scapular plane, 2s eccentric. Set 4: 0 RIR + 4 lengthened partials! 週六第一動作（趁中樞神經100%滿血優先轟炸側肩）！沿30°肩胛平面抬起、2秒慢放；第4組力竭後接4下底部半程組！\n📈 Overload/超負荷: Hit 15 reps/arm × 4 sets w/ zero body english → +1.25–2.5kg. 四組皆滿15下且身體零晃動→下次微調加重。\n🛡️ Safety/防傷: Free hand braced on post eliminates spine sway; keep shoulder depressed away from ear. 扶柱徹底消除腰部晃動；全程壓肩不聳肩。'
      },
      {
        id: 'u2_rear_delt_fly',
        name: '2. Chest-Supported Rear Delt Fly (胸靠墊蝴蝶機反向飛鳥)',
        sets: 3,
        repRange: '15–20',
        minReps: 15,
        maxReps: 20,
        restSeconds: 60,
        restLabel: '60s',
        targetRir: '0 RIR',
        badge: 'Rear Delt Hit #2 of 2 • Sternum Supported | 後三角頻率 #2/2・胸墊護腰',
        cue: '⚙️ Setup/設定: Sternum flat against pad; handles slightly below shoulder level; neutral/pronated grip w/ 45° elbow flare. 胸口貼平靠墊；握把略低於肩，手肘保持45°外展。\n🔥 Hypertrophy/肌肥大: Sweep hands wide outward ("reach for the side walls") to isolate posterior delts for 3D shoulder cap; 1s hold + 2s eccentric. 雙手往兩側牆壁遠方畫大弧線撥開（勿夾肩胛骨搶走張力），頂峰停1秒、2秒慢放。\n📈 Overload/超負荷: Hit 20 clean reps × 3 sets → +2.5kg. 三組皆滿20下標準動作→下次+2.5kg。\n🛡️ Safety/防傷: Chest pad absorbs 100% of torso load; never arch lower back off the pad at the end of the set. 胸墊100%支撐軀幹；力竭時嚴禁挺腰離開靠墊。'
      },
      {
        id: 'd5_preacher_curl',
        name: '3. Machine Preacher Curl (器械牧師椅二頭彎舉)',
        sets: 3,
        repRange: '8–10',
        minReps: 8,
        maxReps: 10,
        restSeconds: 90,
        restLabel: '90s',
        targetRir: '0 RIR',
        badge: 'Distal Bicep & Brachialis Thickness (Pedrosa 2023) | 遠端二頭與肱肌厚度（與背後彎舉互補）',
        cue: '⚙️ Setup/設定: Seat height so armpits & back of triceps are snuggled flush against preacher pad; supinated grip. 調座椅讓腋下與三頭肌完整服貼在斜板上（無空隙），雙手反握。\n🔥 Hypertrophy/肌肥大: Peak torque at bottom stretched position builds distal lower-bicep & brachialis thickness (Pedrosa 2023); 3s slow eccentric. 牧師椅在底部拉伸位張力最大，專攻靠近手肘的「遠端二頭肌與肱肌厚度」（與背後彎舉完美互補）；3秒慢放。\n📈 Overload/超負荷: Hit 10 reps × 3 sets w/ triceps glued to pad → +2.5kg. 三組皆滿10下且手肘不離墊→下次+2.5kg。\n🛡️ Safety/防傷: Lower to ~95% extension (keep micro-bend at bottom—never violently hyperextend elbow joint) and keep butt seated. 下放至95%伸直即可（保留極微彎張力、切勿在底部放鬆頓挫傷手肘肌腱），屁股坐穩不站起。'
      },
      {
        id: 'd5_overhead_tri',
        name: '4. Incline-Supported (or Single-Arm Braced) Overhead Cable Triceps Extension (上斜椅靠背／單手扶柱過頭滑輪三頭伸展)',
        sets: 3,
        repRange: '10–12',
        minReps: 10,
        maxReps: 12,
        restSeconds: 75,
        restLabel: '75s',
        targetRir: '0 RIR',
        badge: 'Back/Post Braced • +40% Long-Head Growth (Maeo 2022) | 靠背或扶柱防折腰・+40% 三頭長頭成長',
        cue: '⚙️ Setup/設定: Set 70°–80° incline bench in front of low/mid pulley (OR stand single-arm w/ free hand braced on tower post). 在滑輪前放70°–80°上斜椅靠背坐穩（或採單手過頭伸展、另一手抓緊柱子固定）。\n🔥 Hypertrophy/肌肥大: Overhead shoulder flexion stretches biarticular long head for +40% MORE triceps growth than pushdowns alone (Maeo 2022); 3s deep lower behind neck. 過頭舉臂能深度拉伸三頭肌長頭，創造比下壓高出+40%的肌肥大（Maeo 2022實證）；3秒慢放至頸後深層拉伸再伸直。\n📈 Overload/超負荷: Hit 12 reps × 3 sets w/ zero rib flare → +1.25–2.5kg. 三組滿12下且肋骨不外翻→下次微調加重。\n🛡️ Safety/防傷: Bench backrest (or post brace) + ribs tucked down 100% blocks lumbar hyperextension arching! 上斜椅背（或扶柱）搭配肋骨下壓，能100%封鎖站姿雙手過頭常見的「下背折腰挺肚」傷腰風險！'
      },
      {
        id: 'd5_bayesian_curl_ss',
        name: '5A. [Superset] Single-Arm Behind-the-Back Cable Curl (超級組：單手背後滑輪二頭彎舉)',
        sets: 2,
        repRange: '12–15/arm',
        minReps: 12,
        maxReps: 15,
        restSeconds: 45,
        restLabel: '45s',
        targetRir: '0 RIR',
        badge: 'Unilateral Bicep Peak • Superset w/ 5B | 單手二頭長頭肌峰・與 5B 超級組',
        cue: '⚙️ Setup/設定: Single low pulley; step forward so working arm hangs ~30° behind torso; brace free hand on frame. 低位滑輪背對往前跨步，讓手臂自然落在身體後方約30°；非訓練手抓柱穩定。\n🔥 Hypertrophy/肌肥大: Keep elbow pinned behind hip line throughout curl to isolate proximal long-head bicep peak; 3s eccentric stretch. 全程將手肘釘在身體中線後方不前移，極大化二頭長頭拉伸與肌峰；3秒慢放到底。\n📈 Overload/超負荷: Hit 15 reps/arm × 2 sets → +1.25–2.5kg. 兩組皆滿15下且手肘固定→下次升一格重量。\n🛡️ Safety/防傷: Free hand braced on post prevents lower-back sway; supinate wrist smoothly. 扶柱固定軀幹零晃動；掌心朝上穩定彎舉不折手腕。'
      },
      {
        id: 'u2_cable_triceps_ext',
        name: '5B. [Superset] Single-Arm Cross-Body Cable Triceps Extension (超級組：單手跨體滑輪三頭下壓)',
        sets: 2,
        repRange: '12–15/arm',
        minReps: 12,
        maxReps: 15,
        restSeconds: 60,
        restLabel: '60s',
        targetRir: '0 RIR',
        badge: 'Same Single Pulley • Lateral & Medial Horseshoe | 同座單邊滑輪・三頭外側馬蹄鐵線條',
        cue: '⚙️ Setup/設定: Same single cable tower set to shoulder height; brace free hand on post. 同一座單邊滑輪調至肩高；另一手扶柱穩住身體。\n🔥 Hypertrophy/肌肥大: Extend forearm diagonally across body to full elbow lockout w/ hard 1s squeeze (targets lateral & medial horseshoe heads). 前臂斜向跨體往下完全伸直並用力鎖死1秒（雕刻三頭肌外側馬蹄鐵與內側頭）。\n📈 Overload/超負荷: Hit 15 reps/arm × 2 sets w/ 1s lockout → +1.25–2.5kg. 兩組皆滿15下完整鎖死→下次升一格重量。\n🛡️ Safety/防傷: Keep upper arm glued in place; zero shoulder internal rotation or lower-back arch. 上臂釘死不動，零肩膀內旋與零折腰。'
      },
      {
        id: 'd5_deadbug_core',
        name: '6. Wall-Press Dead-Bug — Neutral Spine (推牆死蟲式 — 零折腰六塊肌抗伸展訓練)',
        sets: 3,
        repRange: '10–12/side',
        minReps: 10,
        maxReps: 12,
        restSeconds: 60,
        restLabel: '60s',
        targetRir: '0 RIR',
        badge: '6-Pack Rectus Abdominis • Zero Spinal Flexion | 雕刻六塊腹直肌・零脊椎彎曲磨損',
        cue: '⚙️ Setup/設定: Lie on back ~1 foot from wall/rack base; press both palms hard into wall behind head; knees bent 90° in air. 仰躺離牆面或架子底座約30公分，雙手往頭頂後方用力推牆，雙腿屈膝90°抬起。\n🔥 Hypertrophy/肌肥大: Pushing into wall + flattening lower back fires entire 6-pack rectus abdominis via intense anti-extension; take 3s to lower 1 heel to 2cm above floor, exhale hard, return. 雙手推牆＋下背死貼地面能產生極強「抗伸展」張力雕刻六塊腹直肌；花3秒慢放單腳跟至離地2公分、用力吐氣收腹後收回。\n📈 Overload/超負荷: Hit 12 slow reps/side × 3 sets → pause 2s at bottom extension (or wear light ankle weights). 三組每邊滿12下慢速標準動作→在底部伸展點多停2秒。\n🛡️ Safety/防傷: If your lower back arches off the floor even 1cm, shorten leg reach! 100% disc-safe alternative to crunches/leg raises. 一旦感覺下背離開地面出現空隙，立刻縮短腿下放距離！完全零椎間盤彎曲擠壓的六塊肌王牌動作。'
      }
    ]
  }
};

// ============================================================================
// HEVY TEMPLATE MAPPING & PRE-SEEDED WORKOUT HISTORY FROM HEVY
// ============================================================================
const HEVY_TEMPLATE_TO_APP_ID = {
  'BE289E45': 'u1_cable_lat_raise',
  'DE68C825': 'u1_cable_lat_raise',
  'FBF92739': 'u1_incline_press',
  '1DF4A847': 'u1_chest_supp_row',
  'd6904d8f-e078-43c2-a9d4-44a1c2615ea3': 'u1_converging_flat_press',
  '2DBCA395': 'u1_bayesian_preacher_curl',
  'B33B526E': 'u1_bayesian_preacher_curl',
  'B5EFBF9C': 'd5_overhead_tri',
  '11A123F3': 'l1_seated_leg_curl',
  '75A4F6C4': 'l1_leg_extension',
  '3FD83744': 'l1_single_leg_press',
  '91237BDD': 'l1_leg_press_calf',
  'CC55119B': 'l1_pallof_press',
  '473CF5B8': 'u2_neutral_pulldown',
  'BC3492DA': 'u2_upper_back_row',
  'D5D0354D': 'u2_machine_lat_raise',
  '370e448e-c99e-4284-a88c-0b952f899894': 'u2_converging_incline_press',
  '9DCE2D64': 'u2_pec_deck_fly',
  'D8281C62': 'u2_rear_delt_fly',
  '292f33f5-9ffe-40a2-af7e-9dd6a22c1fcc': 'u2_cable_triceps_ext',
  '552AB030': 'u2_cable_triceps_ext',
  '68CE0B9B': 'l2_hip_thrust',
  'B812E76E': 'l2_lying_leg_curl',
  '062AB91A': 'l2_seated_calf_raise',
  'F4B4C6EE': 'l2_seated_hip_abduction',
  '5535b7aa-e6ae-459b-85fe-21057ee5d24a': 'd5_preacher_curl',
  '1E9A6B8E': 'd5_preacher_curl',
  'D8911FC4': 'd5_deadbug_core'
};

const APP_ID_TO_HEVY_TEMPLATE = {
  'u1_incline_press': 'FBF92739',
  'u1_neutral_pulldown': '473CF5B8',
  'u1_converging_flat_press': 'd6904d8f-e078-43c2-a9d4-44a1c2615ea3',
  'u1_chest_supp_row': '1DF4A847',
  'u1_cable_lat_raise': 'DE68C825',
  'u1_bayesian_preacher_curl': 'B33B526E',
  'u1_overhead_tri_ext': '552AB030',
  'l1_seated_leg_curl': '11A123F3',
  'l1_leg_extension': '75A4F6C4',
  'l1_single_leg_press': '3FD83744',
  'l1_leg_press_calf': '91237BDD',
  'l1_pallof_press': 'CC55119B',
  'u2_upper_back_row': 'BC3492DA',
  'u2_converging_incline_press': '370e448e-c99e-4284-a88c-0b952f899894',
  'u2_neutral_pulldown': '473CF5B8',
  'u2_pec_deck_fly': '9DCE2D64',
  'u2_machine_lat_raise': 'D5D0354D',
  'u2_rear_delt_fly_b': 'D8281C62',
  'l2_hip_thrust': '68CE0B9B',
  'l2_lying_leg_curl': '11A123F3',
  'l2_single_leg_press_high': '3FD83744',
  'l2_seated_calf_raise': '062AB91A',
  'l2_seated_hip_abduction': 'F4B4C6EE',
  'd5_fresh_lat_raise': 'DE68C825',
  'u2_rear_delt_fly': 'D8281C62',
  'd5_preacher_curl': '1E9A6B8E',
  'd5_overhead_tri': 'B5EFBF9C',
  'd5_bayesian_curl_ss': 'B33B526E',
  'u2_cable_triceps_ext': '552AB030',
  'd5_deadbug_core': 'D8911FC4'
};

// Equivalent exercises across days so baseline working weights carry over seamlessly
const EXERCISE_EQUIVALENTS = {
  'u1_neutral_pulldown': ['u1_neutral_pulldown', 'u2_neutral_pulldown'],
  'u2_neutral_pulldown': ['u2_neutral_pulldown', 'u1_neutral_pulldown'],
  'd5_fresh_lat_raise': ['d5_fresh_lat_raise', 'u1_cable_lat_raise', 'u2_machine_lat_raise'],
  'u1_overhead_tri_ext': ['u1_overhead_tri_ext', 'u2_cable_triceps_ext'],
  'u2_cable_triceps_ext': ['u2_cable_triceps_ext', 'u1_overhead_tri_ext'],
  'u2_rear_delt_fly_b': ['u2_rear_delt_fly_b', 'u2_rear_delt_fly'],
  'd5_bayesian_curl_ss': ['d5_bayesian_curl_ss', 'u1_bayesian_preacher_curl'],
  'l2_lying_leg_curl': ['l2_lying_leg_curl', 'l1_seated_leg_curl']
};

const DEFAULT_HEVY_HISTORY = [
  {
    "id": "hevy_21c62725-9b22-4a2a-9d82-b174d12fe0f4",
    "dayId": "lower1",
    "dayTitle": "Lower 1: Quad Dominance & Knee-Friendly Alignment",
    "shortTitle": "Lower 1",
    "date": "2026-03-26",
    "timestamp": "2026-03-26T08:07:59+00:00",
    "bodyweight": null,
    "sessionNotes": "Synced from Hevy",
    "totalVolume": 12510,
    "totalSets": 16,
    "exercises": [
      {
        "exerciseId": "l1_seated_leg_curl",
        "name": "Seated Leg Curl (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 72.5, "reps": 11, "rir": "0", "completed": true },
          { "setNumber": 2, "weight": 72.5, "reps": 12, "rir": "0", "completed": true },
          { "setNumber": 3, "weight": 72.5, "reps": 12, "rir": "0", "completed": true }
        ]
      },
      {
        "exerciseId": "l1_leg_extension",
        "name": "Leg Extension (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 72.5, "reps": 15, "rir": "0", "completed": true },
          { "setNumber": 2, "weight": 74.5, "reps": 15, "rir": "0", "completed": true },
          { "setNumber": 3, "weight": 74.5, "reps": 15, "rir": "0", "completed": true }
        ]
      },
      {
        "exerciseId": "l1_single_leg_press",
        "name": "Single Leg Press (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 90, "reps": 12, "rir": "1-2", "completed": true },
          { "setNumber": 2, "weight": 90, "reps": 12, "rir": "1-2", "completed": true },
          { "setNumber": 3, "weight": 90, "reps": 12, "rir": "1-2", "completed": true }
        ]
      },
      {
        "exerciseId": "l1_leg_press_calf",
        "name": "Calf Press (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 40, "reps": 16, "rir": "0", "completed": true },
          { "setNumber": 2, "weight": 40, "reps": 15, "rir": "0", "completed": true },
          { "setNumber": 3, "weight": 40, "reps": 15, "rir": "0", "completed": true },
          { "setNumber": 4, "weight": 40, "reps": 19, "rir": "0", "completed": true }
        ]
      },
      {
        "exerciseId": "l1_pallof_press",
        "name": "Cable Core Pallof Press",
        "sets": [
          { "setNumber": 1, "weight": 22.5, "reps": 12, "rir": "Iso", "completed": true },
          { "setNumber": 2, "weight": 22.5, "reps": 12, "rir": "Iso", "completed": true },
          { "setNumber": 3, "weight": 22.5, "reps": 12, "rir": "Iso", "completed": true }
        ]
      }
    ]
  },
  {
    "id": "hevy_025a641a-d259-4b43-9438-d135c85c6d47",
    "dayId": "upper2",
    "dayTitle": "Upper 2: Lat Width & Shoulder Capping Priority",
    "shortTitle": "Upper 2",
    "date": "2026-03-25",
    "timestamp": "2026-03-25T06:34:46+00:00",
    "bodyweight": null,
    "sessionNotes": "Synced from Hevy",
    "totalVolume": 12977,
    "totalSets": 16,
    "exercises": [
      {
        "exerciseId": "u2_neutral_pulldown",
        "name": "Lat Pulldown (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 96, "reps": 9, "rir": "1", "completed": true },
          { "setNumber": 2, "weight": 96, "reps": 7, "rir": "1", "completed": true },
          { "setNumber": 3, "weight": 96, "reps": 7, "rir": "1", "completed": true }
        ]
      },
      {
        "exerciseId": "u2_machine_lat_raise",
        "name": "Lateral Raise (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 60, "reps": 19, "rir": "0", "completed": true },
          { "setNumber": 2, "weight": 60, "reps": 18, "rir": "0", "completed": true },
          { "setNumber": 3, "weight": 60, "reps": 13, "rir": "0", "completed": true },
          { "setNumber": 4, "weight": 60, "reps": 13, "rir": "0", "completed": true }
        ]
      },
      {
        "exerciseId": "u2_converging_incline_press",
        "name": "Converging Incline Machine Press (30°-40°)",
        "sets": [
          { "setNumber": 1, "weight": 86, "reps": 12, "rir": "1", "completed": true },
          { "setNumber": 2, "weight": 88, "reps": 11, "rir": "1", "completed": true },
          { "setNumber": 3, "weight": 95, "reps": 9, "rir": "1", "completed": true }
        ]
      },
      {
        "exerciseId": "u2_rear_delt_fly",
        "name": "Rear Delt Reverse Fly (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 68, "reps": 20, "rir": "0", "completed": true },
          { "setNumber": 2, "weight": 68, "reps": 15, "rir": "0", "completed": true },
          { "setNumber": 3, "weight": 68, "reps": 18, "rir": "0", "completed": true }
        ]
      },
      {
        "exerciseId": "u2_cable_triceps_ext",
        "name": "Cross-Body Cable Triceps Extension",
        "sets": [
          { "setNumber": 1, "weight": 15, "reps": 12, "rir": "0", "completed": true },
          { "setNumber": 2, "weight": 17.5, "reps": 10, "rir": "0", "completed": true },
          { "setNumber": 3, "weight": 17.5, "reps": 10, "rir": "0", "completed": true }
        ]
      }
    ]
  },
  {
    "id": "hevy_aae1b696-c1c4-41c2-bfef-004b3fdf5fef",
    "dayId": "lower2",
    "dayTitle": "Lower 2: Posterior Chain & Hamstring Priority",
    "shortTitle": "Lower 2",
    "date": "2026-03-23",
    "timestamp": "2026-03-23T07:40:05+00:00",
    "bodyweight": null,
    "sessionNotes": "Synced from Hevy",
    "totalVolume": 8799,
    "totalSets": 15,
    "exercises": [
      {
        "exerciseId": "l2_hip_thrust",
        "name": "Hip Thrust (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 10, "reps": 10, "rir": "1-2", "completed": true },
          { "setNumber": 2, "weight": 20, "reps": 12, "rir": "1-2", "completed": true },
          { "setNumber": 3, "weight": 30, "reps": 11, "rir": "1-2", "completed": true }
        ]
      },
      {
        "exerciseId": "l2_lying_leg_curl",
        "name": "Lying Leg Curl (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 45, "reps": 10, "rir": "0", "completed": true },
          { "setNumber": 2, "weight": 45, "reps": 9, "rir": "0", "completed": true },
          { "setNumber": 3, "weight": 45, "reps": 10, "rir": "0", "completed": true }
        ]
      },
      {
        "exerciseId": "l2_single_leg_press_high",
        "name": "Single Leg Press (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 45, "reps": 12, "rir": "1-2", "completed": true },
          { "setNumber": 2, "weight": 54, "reps": 12, "rir": "1-2", "completed": true },
          { "setNumber": 3, "weight": 63, "reps": 12, "rir": "1-2", "completed": true }
        ]
      },
      {
        "exerciseId": "l2_seated_calf_raise",
        "name": "Seated Calf Raise",
        "sets": [
          { "setNumber": 1, "weight": 40, "reps": 10, "rir": "0", "completed": true },
          { "setNumber": 2, "weight": 40, "reps": 13, "rir": "0", "completed": true },
          { "setNumber": 3, "weight": 40, "reps": 14, "rir": "0", "completed": true }
        ]
      },
      {
        "exerciseId": "l2_seated_hip_abduction",
        "name": "Hip Abduction (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 85, "reps": 12, "rir": "0", "completed": true },
          { "setNumber": 2, "weight": 70, "reps": 17, "rir": "0", "completed": true },
          { "setNumber": 3, "weight": 70, "reps": 17, "rir": "0", "completed": true }
        ]
      }
    ]
  },
  {
    "id": "hevy_cf3e179f-2716-46eb-9300-62f97bc4556d",
    "dayId": "upper1",
    "dayTitle": "Upper 1: Side Delt & Clavicular Chest Priority",
    "shortTitle": "Upper 1",
    "date": "2026-03-22",
    "timestamp": "2026-03-22T13:01:26+00:00",
    "bodyweight": null,
    "sessionNotes": "Synced from Hevy",
    "totalVolume": 7157,
    "totalSets": 15,
    "exercises": [
      {
        "exerciseId": "u1_cable_lat_raise",
        "name": "Lateral Raise (Cable)",
        "sets": [
          { "setNumber": 1, "weight": 10, "reps": 12, "rir": "0", "completed": true },
          { "setNumber": 2, "weight": 10, "reps": 12, "rir": "0", "completed": true },
          { "setNumber": 3, "weight": 10, "reps": 12, "rir": "0", "completed": true },
          { "setNumber": 4, "weight": 10, "reps": 12, "rir": "0", "completed": true }
        ]
      },
      {
        "exerciseId": "u1_incline_press",
        "name": "Incline Chest Press (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 68, "reps": 13, "rir": "1-2", "completed": true },
          { "setNumber": 2, "weight": 77, "reps": 12, "rir": "1-2", "completed": true },
          { "setNumber": 3, "weight": 86, "reps": 8, "rir": "1-2", "completed": true }
        ]
      },
      {
        "exerciseId": "u1_chest_supp_row",
        "name": "Seated Row (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 100, "reps": 9, "rir": "1", "completed": true },
          { "setNumber": 2, "weight": 100, "reps": 8, "rir": "1", "completed": true },
          { "setNumber": 3, "weight": 100, "reps": 8, "rir": "1", "completed": true }
        ]
      },
      {
        "exerciseId": "u1_converging_flat_press",
        "name": "Converging Machine Chest Press",
        "sets": [
          { "setNumber": 1, "weight": 77, "reps": 5, "rir": "0", "completed": true },
          { "setNumber": 2, "weight": 73, "reps": 6, "rir": "0", "completed": true }
        ]
      },
      {
        "exerciseId": "u1_bayesian_preacher_curl",
        "name": "Behind the Back Curl (Cable)",
        "sets": [
          { "setNumber": 1, "weight": 17.5, "reps": 12, "rir": "0", "completed": true },
          { "setNumber": 2, "weight": 27, "reps": 12, "rir": "0", "completed": true },
          { "setNumber": 3, "weight": 27, "reps": 12, "rir": "0", "completed": true }
        ]
      }
    ]
  },
  {
    "id": "hevy_10a269cb-7a05-4cd0-a028-0ff4c9f8b542",
    "dayId": "lower1",
    "dayTitle": "Lower 1: Quad Dominance & Knee-Friendly Alignment",
    "shortTitle": "Lower 1",
    "date": "2026-03-20",
    "timestamp": "2026-03-20T05:44:33+00:00",
    "bodyweight": null,
    "sessionNotes": "Synced from Hevy",
    "totalVolume": 12015,
    "totalSets": 16,
    "exercises": [
      {
        "exerciseId": "l1_seated_leg_curl",
        "name": "Seated Leg Curl (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 72.5, "reps": 11, "rir": "0", "completed": true },
          { "setNumber": 2, "weight": 72.5, "reps": 11, "rir": "0", "completed": true },
          { "setNumber": 3, "weight": 72.5, "reps": 11, "rir": "0", "completed": true }
        ]
      },
      {
        "exerciseId": "l1_leg_extension",
        "name": "Leg Extension (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 72.5, "reps": 12, "rir": "0", "completed": true },
          { "setNumber": 2, "weight": 72.5, "reps": 15, "rir": "0", "completed": true },
          { "setNumber": 3, "weight": 72.5, "reps": 14, "rir": "0", "completed": true }
        ]
      },
      {
        "exerciseId": "l1_single_leg_press",
        "name": "Single Leg Press (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 90, "reps": 12, "rir": "1-2", "completed": true },
          { "setNumber": 2, "weight": 90, "reps": 12, "rir": "1-2", "completed": true },
          { "setNumber": 3, "weight": 90, "reps": 12, "rir": "1-2", "completed": true }
        ]
      },
      {
        "exerciseId": "l1_leg_press_calf",
        "name": "Calf Press (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 40, "reps": 16, "rir": "0", "completed": true },
          { "setNumber": 2, "weight": 40, "reps": 15, "rir": "0", "completed": true },
          { "setNumber": 3, "weight": 40, "reps": 15, "rir": "0", "completed": true },
          { "setNumber": 4, "weight": 40, "reps": 19, "rir": "0", "completed": true }
        ]
      },
      {
        "exerciseId": "l1_pallof_press",
        "name": "Cable Core Pallof Press",
        "sets": [
          { "setNumber": 1, "weight": 22.5, "reps": 12, "rir": "Iso", "completed": true },
          { "setNumber": 2, "weight": 22.5, "reps": 12, "rir": "Iso", "completed": true },
          { "setNumber": 3, "weight": 22.5, "reps": 12, "rir": "Iso", "completed": true }
        ]
      }
    ]
  },
  {
    "id": "hevy_291df741-9100-40da-a12a-6dd580696ea9",
    "dayId": "upper2",
    "dayTitle": "Upper 2: Lat Width & Shoulder Capping Priority",
    "shortTitle": "Upper 2",
    "date": "2026-03-18",
    "timestamp": "2026-03-18T04:57:15+00:00",
    "bodyweight": null,
    "sessionNotes": "Synced from Hevy",
    "totalVolume": 12897,
    "totalSets": 16,
    "exercises": [
      {
        "exerciseId": "u2_neutral_pulldown",
        "name": "Lat Pulldown (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 96, "reps": 9, "rir": "1", "completed": true },
          { "setNumber": 2, "weight": 96, "reps": 7, "rir": "1", "completed": true },
          { "setNumber": 3, "weight": 96, "reps": 7, "rir": "1", "completed": true }
        ]
      },
      {
        "exerciseId": "u2_machine_lat_raise",
        "name": "Lateral Raise (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 60, "reps": 19, "rir": "0", "completed": true },
          { "setNumber": 2, "weight": 60, "reps": 18, "rir": "0", "completed": true },
          { "setNumber": 3, "weight": 60, "reps": 13, "rir": "0", "completed": true },
          { "setNumber": 4, "weight": 60, "reps": 13, "rir": "0", "completed": true }
        ]
      },
      {
        "exerciseId": "u2_converging_incline_press",
        "name": "Converging Incline Machine Press (30°-40°)",
        "sets": [
          { "setNumber": 1, "weight": 86, "reps": 12, "rir": "1", "completed": true },
          { "setNumber": 2, "weight": 88, "reps": 11, "rir": "1", "completed": true },
          { "setNumber": 3, "weight": 90, "reps": 9, "rir": "1", "completed": true }
        ]
      },
      {
        "exerciseId": "u2_rear_delt_fly",
        "name": "Rear Delt Reverse Fly (Machine)",
        "sets": [
          { "setNumber": 1, "weight": 68, "reps": 20, "rir": "0", "completed": true },
          { "setNumber": 2, "weight": 68, "reps": 15, "rir": "0", "completed": true },
          { "setNumber": 3, "weight": 68, "reps": 18, "rir": "0", "completed": true }
        ]
      },
      {
        "exerciseId": "u2_cable_triceps_ext",
        "name": "Cross-Body Cable Triceps Extension",
        "sets": [
          { "setNumber": 1, "weight": 15, "reps": 11, "rir": "0", "completed": true },
          { "setNumber": 2, "weight": 15, "reps": 11, "rir": "0", "completed": true },
          { "setNumber": 3, "weight": 15, "reps": 11, "rir": "0", "completed": true }
        ]
      }
    ]
  }
];

// ============================================================================
// APPLICATION STATE
// ============================================================================
let state = {
  activeTab: 'workout', // 'workout' | 'history' | 'nutrition' | 'blueprint' | 'sync'
  selectedDayId: detectDefaultDay(),
  workoutHistory: [],
  bodyweightLogs: [],
  macroLogs: {},
  activeDraft: null,
  selectedChartExerciseId: 'u1_incline_press',
  settings: {
    unit: 'kg',
    targetBodyweight: 80.0,
    hevyApiKey: '533d98a3-6dea-4105-8abc-c4e532b8a466',
    autoSyncHevy: true,
    lastHevySyncTime: 'Pre-synced with Hevy v1 API',
    githubToken: '',
    githubGistId: '',
    autoSyncGithub: true,
    lastSyncTime: null
  },
  timer: {
    running: false,
    remainingSeconds: 0,
    totalSeconds: 0,
    label: '',
    intervalId: null
  }
};

function detectDefaultDay() {
  const dayOfWeek = new Date().getDay(); // 0 Sun, 1 Mon, 2 Tue, 3 Wed, 4 Thu, 5 Fri, 6 Sat
  if (dayOfWeek === 1) return 'upper1';
  if (dayOfWeek === 2) return 'lower1';
  if (dayOfWeek === 4) return 'upper2';
  if (dayOfWeek === 5) return 'lower2';
  if (dayOfWeek === 6) return 'superman5';
  return 'upper1';
}

function getTodayDateString() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().split('T')[0];
}

// ============================================================================
// STORAGE & INITIALIZATION
// ============================================================================
function loadStateFromStorage() {
  try {
    const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (savedHistory) {
      state.workoutHistory = JSON.parse(savedHistory);
    }

    // Ensure pre-seeded Hevy history is merged in if missing
    const existingIds = new Set(state.workoutHistory.map(w => w.id));
    let addedSeed = false;
    DEFAULT_HEVY_HISTORY.forEach(seedSession => {
      if (!existingIds.has(seedSession.id)) {
        state.workoutHistory.push(seedSession);
        addedSeed = true;
      }
    });
    // Align all history titles & shortTitles with the consistent Option A naming
    state.workoutHistory.forEach(session => {
      if (session.dayId && WORKOUT_PLAN[session.dayId]) {
        session.shortTitle = WORKOUT_PLAN[session.dayId].shortTitle;
        session.dayTitle = WORKOUT_PLAN[session.dayId].title;
      }
    });
    if (addedSeed) {
      state.workoutHistory.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    }

    const savedBw = localStorage.getItem(STORAGE_KEYS.BODYWEIGHT);
    if (savedBw) state.bodyweightLogs = JSON.parse(savedBw);

    const savedMacros = localStorage.getItem(STORAGE_KEYS.MACROS);
    if (savedMacros) state.macroLogs = JSON.parse(savedMacros);

    const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (savedSettings) {
      state.settings = { ...state.settings, ...JSON.parse(savedSettings) };
      if (!state.settings.hevyApiKey) {
        state.settings.hevyApiKey = '533d98a3-6dea-4105-8abc-c4e532b8a466';
      }
    }

    const savedDraft = localStorage.getItem(STORAGE_KEYS.ACTIVE_DRAFT);
    if (savedDraft) {
      state.activeDraft = JSON.parse(savedDraft);
      if (state.activeDraft && state.activeDraft.dayId && WORKOUT_PLAN[state.activeDraft.dayId]) {
        state.selectedDayId = state.activeDraft.dayId;
      }
    }
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
  }

  ensureDraftForSelectedDay();
}

function saveStateToStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.workoutHistory));
    localStorage.setItem(STORAGE_KEYS.BODYWEIGHT, JSON.stringify(state.bodyweightLogs));
    localStorage.setItem(STORAGE_KEYS.MACROS, JSON.stringify(state.macroLogs));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(state.settings));
    if (state.activeDraft) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_DRAFT, JSON.stringify(state.activeDraft));
    }
  } catch (err) {
    console.error('Error saving state:', err);
  }
}

function getLastExerciseLog(exerciseId) {
  const candidateIds = EXERCISE_EQUIVALENTS[exerciseId] || [exerciseId];
  for (let i = 0; i < state.workoutHistory.length; i++) {
    const session = state.workoutHistory[i];
    if (!session.exercises) continue;
    const found = session.exercises.find(e => candidateIds.includes(e.exerciseId));
    if (found && found.sets && found.sets.some(s => s.weight !== '' || s.reps !== '')) {
      return {
        date: session.date,
        sets: found.sets
      };
    }
  }
  return null;
}

function computeOverloadSuggestion(exerciseDef, lastLog) {
  if (!lastLog || !lastLog.sets || lastLog.sets.length === 0) {
    return {
      text: `Establish baseline @ ${exerciseDef.targetRir}`,
      type: 'baseline'
    };
  }
  const completedSets = lastLog.sets.filter(s => Number(s.reps) > 0);
  if (completedSets.length === 0) {
    return {
      text: `Establish baseline @ ${exerciseDef.targetRir}`,
      type: 'baseline'
    };
  }
  const topSet = completedSets.reduce((best, cur) => {
    return Number(cur.weight) > Number(best.weight) ? cur : best;
  }, completedSets[0]);

  const allHitMax = completedSets.length >= exerciseDef.sets &&
    completedSets.every(s => Number(s.reps) >= exerciseDef.maxReps);

  const unit = state.settings.unit;
  if (allHitMax) {
    const increment = unit === 'kg' ? 2.5 : 5;
    const nextWeight = Number(topSet.weight) + increment;
    return {
      text: `All sets hit ${exerciseDef.maxReps} reps! Bump to ${nextWeight} ${unit}`,
      type: 'increase_weight'
    };
  } else {
    const targetReps = Math.min(exerciseDef.maxReps, Number(topSet.reps) + 1);
    return {
      text: `Beat last session: aim for ${topSet.weight || 0} ${unit} × ${targetReps} reps`,
      type: 'add_reps'
    };
  }
}

function createDraftForDay(dayId) {
  const plan = WORKOUT_PLAN[dayId];
  const warmupState = {};
  WARMUP_PROTOCOL.forEach(w => {
    warmupState[w.id] = false;
  });

  const exercises = {};
  plan.exercises.forEach(ex => {
    const lastLog = getLastExerciseLog(ex.id);
    const sets = [];
    for (let i = 0; i < ex.sets; i++) {
      const prevSet = lastLog && lastLog.sets[i] ? lastLog.sets[i] : (lastLog && lastLog.sets[0] ? lastLog.sets[0] : null);
      sets.push({
        setNumber: i + 1,
        weight: prevSet ? prevSet.weight : '',
        reps: prevSet ? prevSet.reps : '',
        rir: ex.targetRir.replace(' RIR', ''),
        completed: false
      });
    }
    exercises[ex.id] = {
      sets,
      notes: ''
    };
  });

  return {
    dayId,
    date: getTodayDateString(),
    startedAt: new Date().toISOString(),
    bodyweight: getLatestBodyweight() || '',
    sessionNotes: '',
    warmupCompleted: warmupState,
    exercises
  };
}

function ensureDraftForSelectedDay() {
  if (!state.activeDraft || state.activeDraft.dayId !== state.selectedDayId || !WORKOUT_PLAN[state.selectedDayId]) {
    state.selectedDayId = WORKOUT_PLAN[state.selectedDayId] ? state.selectedDayId : 'upper1';
    state.activeDraft = createDraftForDay(state.selectedDayId);
    saveStateToStorage();
    return;
  }
  // Ensure any newly added exercises in the upgraded plan are present in existing draft
  const plan = WORKOUT_PLAN[state.selectedDayId];
  let updated = false;
  if (!state.activeDraft.exercises) state.activeDraft.exercises = {};
  plan.exercises.forEach(ex => {
    if (!state.activeDraft.exercises[ex.id]) {
      const lastLog = getLastExerciseLog(ex.id);
      const sets = [];
      for (let i = 0; i < ex.sets; i++) {
        const prevSet = lastLog && lastLog.sets[i] ? lastLog.sets[i] : (lastLog && lastLog.sets[0] ? lastLog.sets[0] : null);
        sets.push({
          setNumber: i + 1,
          weight: prevSet ? prevSet.weight : '',
          reps: prevSet ? prevSet.reps : '',
          rir: ex.targetRir.replace(' RIR', ''),
          completed: false
        });
      }
      state.activeDraft.exercises[ex.id] = { sets, notes: '' };
      updated = true;
    } else {
      // Backfill any uncompleted sets that still have empty weights from Hevy history
      const lastLog = getLastExerciseLog(ex.id);
      if (lastLog && lastLog.sets && lastLog.sets.length > 0) {
        const draftSets = state.activeDraft.exercises[ex.id].sets || [];
        draftSets.forEach((s, i) => {
          if (!s.completed && (s.weight === '' || s.weight === null)) {
            const prevSet = lastLog.sets[i] || lastLog.sets[0];
            if (prevSet && prevSet.weight !== '') {
              s.weight = prevSet.weight;
              if (s.reps === '' || s.reps === null) s.reps = prevSet.reps;
              updated = true;
            }
          }
        });
      }
    }
  });
  if (updated) saveStateToStorage();
}

function getLatestBodyweight() {
  if (state.bodyweightLogs.length === 0) return null;
  const sorted = [...state.bodyweightLogs].sort((a, b) => b.date.localeCompare(a.date));
  return sorted[0].weight;
}

// ============================================================================
// AUDIO SYNTHESIZER FOR REST TIMER (NO EXTERNAL ASSETS NEEDED)
// ============================================================================
function playTimerChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const notes = [587.33, 880, 1174.66]; // D5, A5, D6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.14);
      gain.gain.setValueAtTime(0.22, ctx.currentTime + idx * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.14 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.14);
      osc.stop(ctx.currentTime + idx * 0.14 + 0.36);
    });
  } catch (e) {
    // Ignore audio context restrictions
  }
}

function startRestTimer(seconds, label = 'Rest Timer') {
  if (state.timer.intervalId) {
    clearInterval(state.timer.intervalId);
  }
  state.timer.running = true;
  state.timer.remainingSeconds = seconds;
  state.timer.totalSeconds = seconds;
  state.timer.label = label;
  renderTimerBar();

  state.timer.intervalId = setInterval(() => {
    state.timer.remainingSeconds -= 1;
    if (state.timer.remainingSeconds <= 0) {
      clearInterval(state.timer.intervalId);
      state.timer.running = false;
      state.timer.remainingSeconds = 0;
      playTimerChime();
      showToast(`Rest complete! Ready for next set of ${state.timer.label}`, 'emerald');
    }
    renderTimerBar();
  }, 1000);
}

function adjustRestTimer(deltaSeconds) {
  if (!state.timer.running && state.timer.remainingSeconds <= 0) return;
  state.timer.remainingSeconds = Math.max(0, state.timer.remainingSeconds + deltaSeconds);
  state.timer.totalSeconds = Math.max(state.timer.totalSeconds, state.timer.remainingSeconds);
  renderTimerBar();
}

function stopRestTimer() {
  if (state.timer.intervalId) {
    clearInterval(state.timer.intervalId);
  }
  state.timer.running = false;
  state.timer.remainingSeconds = 0;
  renderTimerBar();
}

function formatSeconds(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// ============================================================================
// WORKOUT LOGGER ACTIONS
// ============================================================================
function selectWorkoutDay(dayId) {
  if (state.selectedDayId === dayId) return;

  // Check if current draft has completed sets before switching
  const hasCompletedSets = state.activeDraft && Object.values(state.activeDraft.exercises || {}).some(
    ex => ex.sets && ex.sets.some(s => s.completed)
  );

  if (hasCompletedSets) {
    const confirmSwitch = confirm('You have checked sets in your current session draft. Switch workout day and reset current draft?');
    if (!confirmSwitch) return;
  }

  state.selectedDayId = dayId;
  state.activeDraft = createDraftForDay(dayId);
  saveStateToStorage();
  renderApp();
}

function toggleWarmupItem(warmupId) {
  if (!state.activeDraft) return;
  state.activeDraft.warmupCompleted[warmupId] = !state.activeDraft.warmupCompleted[warmupId];
  saveStateToStorage();
  renderApp();
}

function updateSetField(exerciseId, setIndex, field, value) {
  if (!state.activeDraft || !state.activeDraft.exercises[exerciseId]) return;
  state.activeDraft.exercises[exerciseId].sets[setIndex][field] = value;
  saveStateToStorage();
}

function toggleSetComplete(exerciseId, setIndex) {
  if (!state.activeDraft || !state.activeDraft.exercises[exerciseId]) return;
  const setObj = state.activeDraft.exercises[exerciseId].sets[setIndex];
  setObj.completed = !setObj.completed;

  const plan = WORKOUT_PLAN[state.selectedDayId];
  const exDef = plan.exercises.find(e => e.id === exerciseId);

  if (setObj.completed && exDef) {
    // Auto-propagate weight to next uncompleted set if empty
    const nextSet = state.activeDraft.exercises[exerciseId].sets[setIndex + 1];
    if (nextSet && !nextSet.completed && (nextSet.weight === '' || nextSet.weight === null)) {
      nextSet.weight = setObj.weight;
    }
    startRestTimer(exDef.restSeconds, exDef.name);
  }
  saveStateToStorage();
  renderApp();
}

function addExtraSet(exerciseId) {
  if (!state.activeDraft || !state.activeDraft.exercises[exerciseId]) return;
  const sets = state.activeDraft.exercises[exerciseId].sets;
  const lastSet = sets[sets.length - 1] || { weight: '', reps: '', rir: '0' };
  sets.push({
    setNumber: sets.length + 1,
    weight: lastSet.weight,
    reps: lastSet.reps,
    rir: lastSet.rir,
    completed: false
  });
  saveStateToStorage();
  renderApp();
}

function removeLastSet(exerciseId) {
  if (!state.activeDraft || !state.activeDraft.exercises[exerciseId]) return;
  const sets = state.activeDraft.exercises[exerciseId].sets;
  if (sets.length <= 1) return;
  sets.pop();
  saveStateToStorage();
  renderApp();
}

function updateDraftMeta(field, value) {
  if (!state.activeDraft) return;
  state.activeDraft[field] = value;
  saveStateToStorage();
}

async function finishWorkoutSession() {
  if (!state.activeDraft) return;
  const plan = WORKOUT_PLAN[state.selectedDayId];

  // Gather exercises & sets
  const recordedExercises = plan.exercises.map(exDef => {
    const draftEx = state.activeDraft.exercises[exDef.id] || { sets: [] };
    return {
      exerciseId: exDef.id,
      name: exDef.name,
      sets: draftEx.sets.map(s => ({
        setNumber: s.setNumber,
        weight: s.weight === '' ? 0 : Number(s.weight),
        reps: s.reps === '' ? 0 : Number(s.reps),
        rir: s.rir,
        completed: Boolean(s.completed)
      }))
    };
  });

  const anyLogged = recordedExercises.some(ex =>
    ex.sets.some(s => s.completed || s.reps > 0 || s.weight > 0)
  );

  if (!anyLogged) {
    showToast('Log or check off at least one set before saving the workout!', 'amber');
    return;
  }

  // Calculate total volume & sets completed
  let totalVolume = 0;
  let totalSetsCompleted = 0;
  recordedExercises.forEach(ex => {
    ex.sets.forEach(s => {
      if (s.completed || s.reps > 0) {
        totalSetsCompleted += 1;
        totalVolume += (Number(s.weight) || 0) * (Number(s.reps) || 0);
      }
    });
  });

  const sessionRecord = {
    id: 'sess_' + Date.now(),
    dayId: state.selectedDayId,
    dayTitle: plan.title,
    shortTitle: plan.shortTitle,
    date: state.activeDraft.date || getTodayDateString(),
    timestamp: new Date().toISOString(),
    bodyweight: state.activeDraft.bodyweight ? Number(state.activeDraft.bodyweight) : null,
    sessionNotes: state.activeDraft.sessionNotes || '',
    totalVolume: Math.round(totalVolume),
    totalSets: totalSetsCompleted,
    exercises: recordedExercises
  };

  state.workoutHistory.unshift(sessionRecord);

  // If bodyweight was entered, also record to bodyweight log
  if (sessionRecord.bodyweight && sessionRecord.bodyweight > 30) {
    logBodyweightEntry(sessionRecord.date, sessionRecord.bodyweight, false);
  }

  // Reset draft for next time
  state.activeDraft = createDraftForDay(state.selectedDayId);
  stopRestTimer();
  saveStateToStorage();

  showToast(`Saved ${plan.shortTitle}! (${totalSetsCompleted} sets • ${totalVolume.toLocaleString()} ${state.settings.unit} volume)`, 'emerald');

  // Auto-sync to Hevy Official API if configured
  if (state.settings.hevyApiKey && state.settings.autoSyncHevy) {
    await pushWorkoutToHevyApi(sessionRecord, true);
  }

  // Auto-sync to GitHub Gist if configured
  if (state.settings.githubToken && state.settings.autoSyncGithub) {
    await syncToGitHubGist(true);
  }

  state.activeTab = 'history';
  renderApp();
}

function deleteWorkoutSession(sessionId) {
  if (!confirm('Delete this workout record from history?')) return;
  state.workoutHistory = state.workoutHistory.filter(s => s.id !== sessionId);
  saveStateToStorage();
  renderApp();
  showToast('Workout session removed.', 'slate');
}

// ============================================================================
// BODYWEIGHT & MACRO TRACKING
// ============================================================================
function logBodyweightEntry(dateStr, weightVal, notify = true) {
  const num = Number(weightVal);
  if (!num || num < 30 || num > 250) {
    if (notify) showToast('Enter a valid bodyweight (e.g. 76.5)', 'amber');
    return;
  }
  const existingIdx = state.bodyweightLogs.findIndex(b => b.date === dateStr);
  if (existingIdx >= 0) {
    state.bodyweightLogs[existingIdx].weight = num;
  } else {
    state.bodyweightLogs.push({ date: dateStr, weight: num });
  }
  state.bodyweightLogs.sort((a, b) => a.date.localeCompare(b.date));
  saveStateToStorage();
  if (notify) {
    showToast(`Logged ${num} ${state.settings.unit} on ${dateStr}`, 'emerald');
    renderApp();
  }
}

function getTodayMacros() {
  const today = getTodayDateString();
  if (!state.macroLogs[today]) {
    state.macroLogs[today] = {
      protein: 0,
      carbs: 0,
      fat: 0,
      notes: ''
    };
  }
  return state.macroLogs[today];
}

function updateTodayMacro(field, value) {
  const today = getTodayDateString();
  const current = getTodayMacros();
  if (field === 'notes') {
    current.notes = value;
  } else {
    current[field] = Math.max(0, Number(value) || 0);
  }
  state.macroLogs[today] = current;
  saveStateToStorage();
  renderApp();
}

function quickAddMacro(field, delta) {
  const current = getTodayMacros();
  updateTodayMacro(field, (Number(current[field]) || 0) + delta);
}

// ============================================================================
// CLOUD SYNC (GITHUB GIST) & JSON BACKUP ENGINE
// ============================================================================
function buildFullBackupPayload() {
  return {
    app: 'superhero-physique-plan',
    version: 1,
    exportedAt: new Date().toISOString(),
    unit: state.settings.unit,
    targetBodyweight: state.settings.targetBodyweight,
    workoutHistory: state.workoutHistory,
    bodyweightLogs: state.bodyweightLogs,
    macroLogs: state.macroLogs
  };
}

function exportJsonBackup() {
  const payload = buildFullBackupPayload();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `superhero-physique-backup-${getTodayDateString()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Downloaded JSON backup file!', 'emerald');
}

function importJsonBackup(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (Array.isArray(data.workoutHistory)) {
        state.workoutHistory = data.workoutHistory;
      }
      if (Array.isArray(data.bodyweightLogs)) {
        state.bodyweightLogs = data.bodyweightLogs;
      }
      if (data.macroLogs && typeof data.macroLogs === 'object') {
        state.macroLogs = data.macroLogs;
      }
      state.activeDraft = createDraftForDay(state.selectedDayId);
      saveStateToStorage();
      renderApp();
      showToast(`Imported ${state.workoutHistory.length} workouts & ${state.bodyweightLogs.length} weight logs!`, 'emerald');
    } catch (err) {
      showToast('Invalid backup JSON file.', 'amber');
    }
  };
  reader.readAsText(file);
}

async function syncToGitHubGist(silent = false) {
  const token = (state.settings.githubToken || '').trim();
  if (!token) {
    if (!silent) showToast('Please enter your GitHub Personal Access Token first.', 'amber');
    return;
  }

  const payload = buildFullBackupPayload();
  const gistId = (state.settings.githubGistId || '').trim();
  const headers = {
    'Accept': 'application/vnd.github+json',
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  try {
    if (!silent) showToast('Syncing workout database to GitHub Gist...', 'sky');
    let response;
    const bodyData = {
      description: 'Superhero Physique Plan — Workout & Bodyweight Database Backup',
      public: false,
      files: {
        'superhero-physique-db.json': {
          content: JSON.stringify(payload, null, 2)
        }
      }
    };

    if (gistId) {
      response = await fetch(`https://api.github.com/gists/${gistId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(bodyData)
      });
    } else {
      response = await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers,
        body: JSON.stringify(bodyData)
      });
    }

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const result = await response.json();
    state.settings.githubGistId = result.id;
    state.settings.lastSyncTime = new Date().toLocaleString();
    saveStateToStorage();
    renderApp();
    showToast('Cloud Sync complete! Saved privately to GitHub Gist.', 'emerald');
  } catch (err) {
    console.error('GitHub Sync Error:', err);
    showToast(`GitHub Sync failed: ${err.message}. Check your token permissions (needs 'gist' scope).`, 'amber');
  }
}

async function pullFromGitHubGist() {
  const token = (state.settings.githubToken || '').trim();
  const gistId = (state.settings.githubGistId || '').trim();
  if (!token || !gistId) {
    showToast('Enter both your GitHub Token and Gist ID to pull data.', 'amber');
    return;
  }

  try {
    showToast('Fetching database from GitHub Gist...', 'sky');
    const response = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const gist = await response.json();
    const fileObj = gist.files && gist.files['superhero-physique-db.json'];
    if (!fileObj || !fileObj.content) {
      throw new Error('superhero-physique-db.json not found in this Gist');
    }
    const data = JSON.parse(fileObj.content);
    if (Array.isArray(data.workoutHistory)) state.workoutHistory = data.workoutHistory;
    if (Array.isArray(data.bodyweightLogs)) state.bodyweightLogs = data.bodyweightLogs;
    if (data.macroLogs) state.macroLogs = data.macroLogs;
    state.settings.lastSyncTime = new Date().toLocaleString();
    state.activeDraft = createDraftForDay(state.selectedDayId);
    saveStateToStorage();
    renderApp();
    showToast(`Pulled ${state.workoutHistory.length} workouts from GitHub Cloud!`, 'emerald');
  } catch (err) {
    showToast(`Pull failed: ${err.message}`, 'amber');
  }
}

// ============================================================================
// HEVY OFFICIAL PUBLIC API (v1) LIVE 2-WAY SYNC
// ============================================================================
async function pullFromHevyApi(silent = false) {
  const apiKey = (state.settings.hevyApiKey || '').trim();
  if (!apiKey) {
    if (!silent) showToast('Please enter your Hevy API Key first.', 'amber');
    return;
  }

  try {
    if (!silent) showToast('Pulling latest workouts from Hevy Official API...', 'sky');
    const response = await fetch('https://api.hevyapp.com/v1/workouts?page=1&pageSize=10', {
      headers: {
        'accept': 'application/json',
        'api-key': apiKey
      }
    });
    if (!response.ok) {
      throw new Error(`Hevy API HTTP ${response.status}`);
    }
    const data = await response.json();
    const workouts = data.workouts || [];

    const existingById = new Map();
    state.workoutHistory.forEach(w => existingById.set(w.id, w));

    let importedCount = 0;
    workouts.forEach(w => {
      const hevyId = 'hevy_' + w.id;
      const titleLower = (w.title || '').toLowerCase();
      let dayId = 'upper1';
      let shortTitle = 'Upper A';
      if (titleLower.includes('lower a') || titleLower.includes('lower 1')) { dayId = 'lower1'; shortTitle = 'Lower A'; }
      else if (titleLower.includes('upper b') || titleLower.includes('upper 2')) { dayId = 'upper2'; shortTitle = 'Upper B'; }
      else if (titleLower.includes('lower b') || titleLower.includes('lower 2')) { dayId = 'lower2'; shortTitle = 'Lower B'; }
      else if (titleLower.includes('upper c') || titleLower.includes('day 5') || titleLower.includes('superman')) { dayId = 'superman5'; shortTitle = 'Upper C'; }

      let totalVolume = 0;
      let totalSets = 0;
      const exercises = (w.exercises || []).map(ex => {
        const mappedId = HEVY_TEMPLATE_TO_APP_ID[ex.exercise_template_id] || ex.exercise_template_id;
        const isHighFoot = dayId === 'lower2' && ex.exercise_template_id === '3FD83744';
        const isDay5Lat = dayId === 'superman5' && ex.exercise_template_id === 'BE289E45';
        const isDay5Tri = dayId === 'superman5' && ex.exercise_template_id === 'B5EFBF9C';
        const isDay5Curl = dayId === 'superman5' && ex.exercise_template_id === '2DBCA395';

        const finalExId = isHighFoot
          ? 'l2_single_leg_press_high'
          : isDay5Lat
            ? 'd5_fresh_lat_raise'
            : isDay5Tri
              ? 'd5_overhead_tri'
              : isDay5Curl
                ? 'd5_bayesian_curl_ss'
                : mappedId;

        const sets = (ex.sets || []).map((s, idx) => {
          const wt = Number(s.weight_kg) || 0;
          const rp = Number(s.reps) || 0;
          totalSets += 1;
          totalVolume += wt * rp;
          return {
            setNumber: idx + 1,
            weight: wt,
            reps: rp,
            rir: s.rpe ? String(10 - s.rpe) : '0-1',
            completed: true
          };
        });
        return {
          exerciseId: finalExId,
          name: ex.title,
          sets
        };
      });

      existingById.set(hevyId, {
        id: hevyId,
        dayId,
        dayTitle: w.title,
        shortTitle,
        date: (w.start_time || '').split('T')[0],
        timestamp: w.start_time,
        bodyweight: null,
        sessionNotes: w.description || 'Synced from Hevy Official API',
        totalVolume: Math.round(totalVolume),
        totalSets,
        exercises
      });
      importedCount += 1;
    });

    state.workoutHistory = Array.from(existingById.values()).sort((a, b) =>
      (b.date || '').localeCompare(a.date || '')
    );
    state.settings.lastHevySyncTime = new Date().toLocaleString();
    state.activeDraft = createDraftForDay(state.selectedDayId);
    saveStateToStorage();
    renderApp();
    if (!silent) {
      showToast(`Synced ${importedCount} workouts directly from Hevy!`, 'emerald');
    }
  } catch (err) {
    console.error('Hevy Pull Error:', err);
    if (!silent) {
      showToast(`Hevy API Pull failed: ${err.message}`, 'amber');
    }
  }
}

async function pushWorkoutToHevyApi(sessionRecord, silent = false) {
  const apiKey = (state.settings.hevyApiKey || '').trim();
  if (!apiKey || !sessionRecord) return;

  try {
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - 55 * 60 * 1000); // 55-min session window

    const hevyExercises = [];
    (sessionRecord.exercises || []).forEach(ex => {
      const templateId = APP_ID_TO_HEVY_TEMPLATE[ex.exerciseId];
      if (!templateId) return;
      const validSets = (ex.sets || []).filter(s => s.completed || Number(s.reps) > 0);
      if (validSets.length === 0) return;

      hevyExercises.push({
        exercise_template_id: templateId,
        superset_id: null,
        notes: sessionRecord.sessionNotes || null,
        sets: validSets.map(s => ({
          type: 'normal',
          weight_kg: Number(s.weight) || 0,
          reps: Number(s.reps) || 0,
          distance_meters: null,
          duration_seconds: null,
          custom_metric: null,
          rpe: null
        }))
      });
    });

    if (hevyExercises.length === 0) return;

    const response = await fetch('https://api.hevyapp.com/v1/workouts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        workout: {
          title: sessionRecord.dayTitle,
          description: sessionRecord.sessionNotes || 'Logged via Superhero Physique Interactive App',
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          is_private: false,
          exercises: hevyExercises
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Hevy POST workout HTTP ${response.status}`);
    }

    state.settings.lastHevySyncTime = new Date().toLocaleString();
    saveStateToStorage();
    if (!silent) {
      showToast('Workout pushed live to your Hevy account!', 'emerald');
    }
  } catch (err) {
    console.error('Hevy Push Error:', err);
    if (!silent) {
      showToast(`Could not push workout to Hevy: ${err.message}`, 'amber');
    }
  }
}

// ============================================================================
// TOAST NOTIFICATION HELPER
// ============================================================================
function showToast(message, color = 'sky') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const colorClasses = {
    emerald: 'border-emerald-500/50 bg-emerald-950/90 text-emerald-100',
    amber: 'border-amber-500/50 bg-amber-950/90 text-amber-100',
    sky: 'border-sky-500/50 bg-sky-950/90 text-sky-100',
    slate: 'border-slate-500/50 bg-slate-900/90 text-slate-100'
  };
  const toast = document.createElement('div');
  toast.className = `px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${colorClasses[color] || colorClasses.sky}`;
  toast.innerHTML = `<span>⚡</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 300);
  }, 3400);
}

// ============================================================================
// UI RENDERING ENGINE
// ============================================================================
function switchTab(tabId) {
  state.activeTab = tabId;
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderTimerBar() {
  const bar = document.getElementById('floating-timer-bar');
  if (!bar) return;

  if (!state.timer.running && state.timer.remainingSeconds <= 0) {
    bar.classList.add('hidden');
    return;
  }

  bar.classList.remove('hidden');
  const pct = state.timer.totalSeconds > 0
    ? Math.max(0, Math.min(100, (state.timer.remainingSeconds / state.timer.totalSeconds) * 100))
    : 0;

  bar.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
      <div class="flex items-center gap-3 min-w-0">
        <div class="w-11 h-11 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 font-mono font-bold text-base timer-active-glow shrink-0">
          ${formatSeconds(state.timer.remainingSeconds)}
        </div>
        <div class="min-w-0">
          <div class="text-xs uppercase tracking-wider text-sky-400 font-semibold">Active Rest Timer</div>
          <div class="text-sm text-slate-200 font-medium truncate">${state.timer.label}</div>
        </div>
      </div>
      <div class="flex items-center gap-1.5 shrink-0">
        <button onclick="adjustRestTimer(-15)" class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700">-15s</button>
        <button onclick="adjustRestTimer(15)" class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700">+15s</button>
        <button onclick="stopRestTimer()" class="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-xs font-semibold text-rose-300 border border-rose-500/30">Skip</button>
      </div>
    </div>
    <div class="w-full bg-slate-900 h-1">
      <div class="bg-gradient-to-r from-sky-400 to-indigo-500 h-1 transition-all duration-500" style="width: ${pct}%"></div>
    </div>
  `;
}

function findItemDefinition(itemId) {
  const warmupItem = WARMUP_PROTOCOL.find(w => w.id === itemId);
  if (warmupItem) {
    return {
      id: warmupItem.id,
      name: warmupItem.name,
      badge: warmupItem.prescription,
      cue: warmupItem.cue,
      restSeconds: warmupItem.timerSeconds,
      restLabel: `${warmupItem.timerSeconds}s`
    };
  }
  for (const day of Object.values(WORKOUT_PLAN)) {
    const found = day.exercises.find(e => e.id === itemId);
    if (found) return found;
  }
  return null;
}

function openExerciseModal(itemId) {
  const modalRoot = document.getElementById('exercise-modal-root');
  if (!modalRoot) return;
  const item = findItemDefinition(itemId);
  const media = EXERCISE_MEDIA[itemId];
  if (!item || !media) return;

  const photo0Url = `${PHOTO_BASE}${media.photoFolder}/0.jpg`;
  const photo1Url = `${PHOTO_BASE}${media.photoFolder}/1.jpg`;

  modalRoot.innerHTML = `
    <div
      class="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onclick="if(event.target === this) closeExerciseModal()"
    >
      <div class="glass-panel rounded-2xl max-w-2xl w-full p-4 sm:p-6 border border-sky-500/40 shadow-2xl my-auto">
        <!-- Modal Header -->
        <div class="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <span class="text-[11px] font-bold uppercase tracking-wider text-sky-400">${item.badge || 'Biomechanical Form Guide'}</span>
            <h3 class="text-lg sm:text-xl font-extrabold text-white mt-0.5">${item.name}</h3>
          </div>
          <button
            onclick="closeExerciseModal()"
            class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm flex items-center justify-center shrink-0"
          >
            ✕
          </button>
        </div>

        <!-- Media Grid: Animated GIF + Start/Peak Real Gym Photos -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <!-- Animated Rep Loop GIF -->
          <div class="bg-white rounded-xl p-2 flex flex-col items-center justify-between border-2 border-sky-400/60 shadow-lg">
            <span class="w-full text-[10px] font-extrabold uppercase tracking-wider text-slate-900 bg-sky-100 px-2 py-0.5 rounded text-center mb-1">
              🎬 Animated Rep Loop
            </span>
            <img
              src="${media.gif}"
              alt="${item.name} Animated Demo"
              class="w-full h-44 object-contain rounded-lg"
            />
          </div>

          <!-- Start Position Photo -->
          <div class="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex flex-col">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-300 bg-slate-950/90 px-2.5 py-1 text-center border-b border-slate-800">
              1. Start / Lengthened Setup
            </span>
            <img
              src="${photo0Url}"
              alt="${item.name} Start Position"
              class="w-full h-44 object-cover"
              onerror="this.parentElement.style.display='none'"
            />
          </div>

          <!-- Peak Contraction Photo -->
          <div class="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex flex-col">
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-slate-950/90 px-2.5 py-1 text-center border-b border-slate-800">
              2. Peak Contraction / Finish
            </span>
            <img
              src="${photo1Url}"
              alt="${item.name} Peak Contraction"
              class="w-full h-44 object-cover"
              onerror="this.parentElement.style.display='none'"
            />
          </div>
        </div>

        <!-- Anatomical & Biomechanical Details -->
        <div class="space-y-2.5 text-xs sm:text-sm">
          <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <div class="text-[11px] font-bold uppercase tracking-wider text-indigo-400 mb-0.5">🎯 Target Muscles</div>
            <div class="font-semibold text-white">${media.muscles}</div>
          </div>

          <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <div class="text-[11px] font-bold uppercase tracking-wider text-sky-400 mb-0.5">⚡ Key Execution Cue (動作要領)</div>
            <div class="text-slate-200 leading-relaxed whitespace-pre-line">${item.cue}</div>
          </div>

          <div class="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
            <div class="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-0.5">🛡️ Spine, Hip & Hypertrophy Rationale (運動科學與護腰原理)</div>
            <div class="text-emerald-100/90 leading-relaxed whitespace-pre-line">${media.biomechanics}</div>
          </div>
        </div>

        <!-- Modal Footer Actions -->
        <div class="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-800">
          <button
            onclick="startRestTimer(${item.restSeconds || 90}, '${item.name.replace(/'/g, '')}'); closeExerciseModal();"
            class="px-4 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 font-bold text-xs flex items-center gap-1.5"
          >
            <span>⏱</span>
            <span>Start ${item.restLabel || '90s'} Timer</span>
          </button>
          <button
            onclick="closeExerciseModal()"
            class="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  `;
}

function closeExerciseModal() {
  const modalRoot = document.getElementById('exercise-modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
}

function renderWorkoutTab() {
  const plan = WORKOUT_PLAN[state.selectedDayId];
  const draft = state.activeDraft;

  // Count completed sets in current draft
  let totalTargetSets = 0;
  let completedSetsCount = 0;
  plan.exercises.forEach(ex => {
    const dEx = draft.exercises[ex.id];
    if (dEx && dEx.sets) {
      totalTargetSets += dEx.sets.length;
      completedSetsCount += dEx.sets.filter(s => s.completed).length;
    }
  });
  const progressPct = totalTargetSets > 0 ? Math.round((completedSetsCount / totalTargetSets) * 100) : 0;

  const dayTabsHtml = Object.values(WORKOUT_PLAN).map(d => {
    const isSelected = d.id === state.selectedDayId;
    return `
      <button
        onclick="selectWorkoutDay('${d.id}')"
        class="flex-1 min-w-[130px] py-2.5 px-3 rounded-xl border text-left transition-all ${
          isSelected
            ? 'bg-gradient-to-br from-sky-500/20 to-indigo-600/20 border-sky-400/60 shadow-lg shadow-sky-950/50'
            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
        }"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-sky-400' : 'text-slate-500'}">${d.dayLabel}</span>
          ${isSelected ? '<span class="w-2 h-2 rounded-full bg-sky-400"></span>' : ''}
        </div>
        <div class="text-sm font-bold mt-0.5 ${isSelected ? 'text-white' : 'text-slate-300'}">${d.shortTitle}</div>
      </button>
    `;
  }).join('');

  // Pre-Lower & Pickleball 8-min Warmup Banner (shown automatically on Lower 1 & Lower 2)
  const warmupHtml = plan.needsLowerWarmup ? `
    <div class="glass-panel rounded-2xl p-4 sm:p-5 mb-6 border-l-4 border-l-amber-400">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-amber-400 block">Mandatory Pre-Lower & Pickleball Protocol (8 Min)</span>
          <h3 class="text-base font-bold text-white">Hip Capsule & McGill Lumbar Stiffness Warm-Up</h3>
        </div>
        <span class="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium">
          Tap GIF to inspect form
        </span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        ${WARMUP_PROTOCOL.map(w => {
          const checked = draft.warmupCompleted && draft.warmupCompleted[w.id];
          const wMedia = EXERCISE_MEDIA[w.id];
          return `
            <div class="p-3 rounded-xl border transition-all ${checked ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-900/70 border-slate-800'}">
              <div class="flex items-start gap-2.5">
                ${wMedia ? `
                  <div onclick="openExerciseModal('${w.id}')" class="exercise-thumb-wrap w-16 h-16 shrink-0" title="Tap for full form guide & photos">
                    <img src="${wMedia.gif}" alt="${w.name}" loading="lazy" class="exercise-thumb-img" />
                    <span class="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[9px] text-sky-300 text-center font-bold py-0.5">🔍 Form</span>
                  </div>
                ` : ''}
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-1">
                    <label class="flex items-start gap-2 cursor-pointer select-none">
                      <input type="checkbox" ${checked ? 'checked' : ''} onchange="toggleWarmupItem('${w.id}')" class="mt-1 w-4 h-4 rounded accent-emerald-500" />
                      <div>
                        <div class="text-xs sm:text-sm font-semibold ${checked ? 'line-through text-emerald-300' : 'text-slate-100'}">${w.name}</div>
                        <div class="text-xs font-bold text-sky-400 mt-0.5">${w.prescription}</div>
                      </div>
                    </label>
                  </div>
                  <div class="flex items-center gap-1.5 mt-2">
                    <button onclick="startRestTimer(${w.timerSeconds}, '${w.name.replace(/'/g, '')}')" class="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-sky-300 border border-slate-700">
                      ⏱ ${w.timerSeconds}s Timer
                    </button>
                    <button onclick="openExerciseModal('${w.id}')" class="px-2 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700/70">
                      🎬 Demo
                    </button>
                  </div>
                </div>
              </div>
              <p class="text-xs text-slate-400 mt-2 leading-relaxed whitespace-pre-line">${w.cue}</p>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  ` : '';

  // Exercise Cards
  const exercisesHtml = plan.exercises.map((ex, exIdx) => {
    const draftEx = draft.exercises[ex.id] || { sets: [] };
    const lastLog = getLastExerciseLog(ex.id);
    const overload = computeOverloadSuggestion(ex, lastLog);
    const media = EXERCISE_MEDIA[ex.id];

    const lastSummaryText = lastLog
      ? `Last (${lastLog.date}): ` + lastLog.sets.filter(s => Number(s.reps) > 0).map(s => `${s.weight}${state.settings.unit}×${s.reps}`).join(', ')
      : 'No previous session logged yet';

    const overloadBadgeStyle = overload.type === 'increase_weight'
      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
      : overload.type === 'add_reps'
      ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
      : 'bg-slate-800 text-slate-300 border-slate-700';

    const setsRowsHtml = draftEx.sets.map((s, sIdx) => {
      return `
        <div class="set-row grid grid-cols-12 gap-2 items-center p-2 rounded-xl border ${s.completed ? 'completed' : 'bg-slate-900/40 border-slate-800/80'}">
          <div class="col-span-2 sm:col-span-1 flex items-center justify-center">
            <span class="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center">
              ${sIdx + 1}
            </span>
          </div>
          <div class="col-span-4 sm:col-span-4">
            <div class="relative">
              <input
                type="number"
                step="0.5"
                inputmode="decimal"
                placeholder="0"
                value="${s.weight}"
                 oninput="updateSetField('${ex.id}', ${sIdx}, 'weight', this.value)"
                class="gym-input w-full py-2 px-2 text-sm"
              />
              <span class="absolute right-2.5 top-2 text-[10px] text-slate-500 pointer-events-none uppercase">${state.settings.unit}</span>
            </div>
          </div>
          <div class="col-span-3 sm:col-span-3">
            <div class="relative">
              <input
                type="number"
                inputmode="numeric"
                placeholder="${ex.minReps}"
                value="${s.reps}"
                oninput="updateSetField('${ex.id}', ${sIdx}, 'reps', this.value)"
                class="gym-input w-full py-2 px-2 text-sm"
              />
              <span class="absolute right-2 top-2 text-[10px] text-slate-500 pointer-events-none">reps</span>
            </div>
          </div>
          <div class="hidden sm:block sm:col-span-2">
            <select
              onchange="updateSetField('${ex.id}', ${sIdx}, 'rir', this.value)"
              class="gym-input w-full py-2 px-1 text-xs"
            >
              <option value="0" ${s.rir === '0' ? 'selected' : ''}>0 RIR</option>
              <option value="1" ${s.rir === '1' ? 'selected' : ''}>1 RIR</option>
              <option value="1-2" ${s.rir === '1-2' ? 'selected' : ''}>1–2 RIR</option>
              <option value="2" ${s.rir === '2' ? 'selected' : ''}>2 RIR</option>
              <option value="Iso" ${s.rir === 'Iso' || s.rir === 'Isometric' ? 'selected' : ''}>Iso</option>
            </select>
          </div>
          <div class="col-span-3 sm:col-span-2 flex justify-end">
            <button
              onclick="toggleSetComplete('${ex.id}', ${sIdx})"
              class="w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all ${
                s.completed
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }"
            >
              ${s.completed ? '✓ Done' : 'Log'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="glass-panel rounded-2xl p-4 sm:p-5 mb-4 transition-all hover:border-slate-700">
        <!-- Exercise Header with Animated GIF Thumbnail -->
        <div class="flex flex-col sm:flex-row items-start justify-between gap-3.5 mb-3">
          <div class="flex items-start gap-3.5 w-full">
            ${media ? `
              <div
                onclick="openExerciseModal('${ex.id}')"
                class="exercise-thumb-wrap w-20 h-20 sm:w-24 sm:h-24 shrink-0"
                title="Tap to view larger Animated Demo + Start/Finish Photos"
              >
                <img src="${media.gif}" alt="${ex.name} animated demo" loading="lazy" class="exercise-thumb-img" />
                <span class="absolute bottom-0 inset-x-0 bg-slate-950/85 text-[10px] text-sky-300 text-center font-bold py-0.5">
                  🎬 Inspect
                </span>
              </div>
            ` : ''}
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2">
                <h3 class="text-base sm:text-lg font-bold text-white leading-snug">${ex.name}</h3>
                <span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  ${ex.badge}
                </span>
              </div>
              ${media ? `<div class="text-[11px] font-medium text-emerald-400/90 mt-1">🎯 ${media.muscles}</div>` : ''}
              <p class="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed whitespace-pre-line">${ex.cue}</p>
            </div>
          </div>

          <div class="flex sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto justify-end shrink-0">
            <button
              onclick="startRestTimer(${ex.restSeconds}, '${ex.name.replace(/'/g, '')}')"
              class="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-sky-300 flex items-center gap-1.5 shrink-0"
            >
              <span>⏱</span>
              <span>Rest ${ex.restLabel}</span>
            </button>
            ${media ? `
              <button
                onclick="openExerciseModal('${ex.id}')"
                class="px-3 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-xs font-semibold text-sky-300 flex items-center gap-1.5 shrink-0"
              >
                <span>🎬</span>
                <span>Form & Photos</span>
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Prescription & Progressive Overload Banner -->
        <div class="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/90 mb-3 text-xs">
          <div class="flex flex-wrap items-center gap-3 text-slate-300">
            <span><strong class="text-white">${ex.sets}</strong> sets</span>
            <span>•</span>
            <span><strong class="text-white">${ex.repRange}</strong> reps</span>
            <span>•</span>
            <span>Target: <strong class="text-amber-300">${ex.targetRir}</strong></span>
            <span>•</span>
            <span class="text-slate-400">${lastSummaryText}</span>
          </div>
          <div class="px-2.5 py-1 rounded-lg border font-semibold ${overloadBadgeStyle}">
            🎯 ${overload.text}
          </div>
        </div>

        <!-- Set Table Headers -->
        <div class="grid grid-cols-12 gap-2 px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          <div class="col-span-2 sm:col-span-1 text-center">Set</div>
          <div class="col-span-4 sm:col-span-4 text-center">Load (${state.settings.unit})</div>
          <div class="col-span-3 sm:col-span-3 text-center">Reps (${ex.repRange})</div>
          <div class="hidden sm:block sm:col-span-2 text-center">RIR</div>
          <div class="col-span-3 sm:col-span-2 text-right pr-2">Status</div>
        </div>

        <!-- Set Rows -->
        <div class="space-y-2">
          ${setsRowsHtml}
        </div>

        <!-- Add/Remove Set Controls -->
        <div class="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/60 text-xs">
          <div class="flex items-center gap-2">
            <button onclick="addExtraSet('${ex.id}')" class="text-sky-400 hover:text-sky-300 font-medium px-2 py-1 rounded hover:bg-slate-800/60">+ Add Set</button>
            ${draftEx.sets.length > 1 ? `<button onclick="removeLastSet('${ex.id}')" class="text-slate-500 hover:text-slate-300 px-2 py-1 rounded hover:bg-slate-800/60">- Remove Set</button>` : ''}
          </div>
          <span class="text-slate-500">${draftEx.sets.filter(s => s.completed).length} / ${draftEx.sets.length} sets done</span>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="tab-content">
      <!-- Day Selector Strip -->
      <div class="flex gap-2.5 overflow-x-auto pb-2 mb-5">
        ${dayTabsHtml}
      </div>

      <!-- Active Session Banner -->
      <div class="glass-panel rounded-2xl p-4 sm:p-5 mb-5 border-t-2 border-t-sky-400">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">${plan.dayLabel}</span>
              <span class="text-xs text-slate-400">${plan.subtitle}</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-extrabold text-white mt-1">${plan.title}</h2>
          </div>

          <div class="flex flex-wrap items-center gap-2.5">
            <div class="bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5">
              <label class="block text-[10px] uppercase tracking-wider text-slate-400">Workout Date</label>
              <input
                type="date"
                value="${draft.date}"
                onchange="updateDraftMeta('date', this.value)"
                class="bg-transparent text-xs font-semibold text-white focus:outline-none"
              />
            </div>
            <div class="bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5">
              <label class="block text-[10px] uppercase tracking-wider text-slate-400">Bodyweight (${state.settings.unit})</label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 76.5"
                value="${draft.bodyweight}"
                oninput="updateDraftMeta('bodyweight', this.value)"
                class="bg-transparent text-xs font-semibold text-white w-20 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Session Completion Progress Bar -->
        <div class="mt-4">
          <div class="flex justify-between text-xs mb-1">
            <span class="text-slate-400 font-medium">Session Progress</span>
            <span class="text-sky-400 font-bold">${completedSetsCount} / ${totalTargetSets} sets (${progressPct}%)</span>
          </div>
          <div class="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div class="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-300" style="width: ${progressPct}%"></div>
          </div>
        </div>
      </div>

      ${warmupHtml}

      <!-- Exercises List -->
      <div>
        ${exercisesHtml}
      </div>

      <!-- Session Notes & Finish Workout CTA -->
      <div class="glass-panel rounded-2xl p-4 sm:p-5 mt-6 mb-10">
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Session Notes (Joint feel, energy, machine setting numbers)
        </label>
        <textarea
          rows="2"
          placeholder="e.g., Seat notch #4 on Incline Press; zero lower back tightness on Single-Leg Press..."
          oninput="updateDraftMeta('sessionNotes', this.value)"
          class="w-full rounded-xl bg-slate-900/90 border border-slate-800 p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 mb-4"
        >${draft.sessionNotes || ''}</textarea>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="text-xs text-slate-400">
            Auto-saved locally on every tap. ${state.settings.githubToken ? '⚡ GitHub Cloud Sync enabled.' : 'Configure GitHub Cloud Sync in the Cloud/Backup tab.'}
          </div>
          <button
            onclick="finishWorkoutSession()"
            class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>🏆 Complete & Save Workout Session</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// HISTORY & PROGRESSIVE OVERLOAD ANALYTICS TAB
// ============================================================================
function renderExerciseChartSvg(exerciseId) {
  // Gather chronological points for selected exercise
  const points = [];
  const chronological = [...state.workoutHistory].reverse();

  chronological.forEach(sess => {
    const ex = (sess.exercises || []).find(e => e.exerciseId === exerciseId);
    if (!ex || !ex.sets) return;
    const validSets = ex.sets.filter(s => Number(s.reps) > 0 && Number(s.weight) >= 0);
    if (validSets.length === 0) return;

    const topSet = validSets.reduce((best, cur) => {
      const curScore = Number(cur.weight) * (1 + Number(cur.reps) / 30);
      const bestScore = Number(best.weight) * (1 + Number(best.reps) / 30);
      return curScore >= bestScore ? cur : best;
    }, validSets[0]);

    const e1rm = Math.round(Number(topSet.weight) * (1 + Number(topSet.reps) / 30) * 10) / 10;
    points.push({
      date: sess.date.slice(5), // MM-DD
      topWeight: Number(topSet.weight),
      topReps: Number(topSet.reps),
      e1rm
    });
  });

  if (points.length === 0) {
    return `
      <div class="h-48 flex flex-col items-center justify-center text-slate-400 text-sm border border-dashed border-slate-800 rounded-xl">
        <p>No logged sessions for this exercise yet.</p>
        <p class="text-xs text-slate-500 mt-1">Complete a workout in the Logger tab to see your strength curve!</p>
      </div>
    `;
  }

  const width = 650;
  const height = 200;
  const padX = 45;
  const padY = 28;
  const vals = points.map(p => p.topWeight);
  const minVal = Math.max(0, Math.min(...vals) - 5);
  const maxVal = Math.max(...vals) + 5;
  const range = Math.max(1, maxVal - minVal);

  const coords = points.map((p, i) => {
    const x = points.length === 1
      ? width / 2
      : padX + (i / (points.length - 1)) * (width - padX * 2);
    const y = height - padY - ((p.topWeight - minVal) / range) * (height - padY * 2);
    return { ...p, x, y };
  });

  const polylinePoints = coords.map(c => `${c.x},${c.y}`).join(' ');

  return `
    <div class="overflow-x-auto">
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-52 bg-slate-950/60 rounded-xl border border-slate-800/80">
        <!-- Grid lines -->
        <line x1="${padX}" y1="${padY}" x2="${width - padX}" y2="${padY}" stroke="#1e293b" stroke-dasharray="4" />
        <line x1="${padX}" y1="${height / 2}" x2="${width - padX}" y2="${height / 2}" stroke="#1e293b" stroke-dasharray="4" />
        <line x1="${padX}" y1="${height - padY}" x2="${width - padX}" y2="${height - padY}" stroke="#1e293b" />

        ${coords.length > 1 ? `<polyline fill="none" stroke="#38bdf8" stroke-width="3" points="${polylinePoints}" />` : ''}

        ${coords.map(c => `
          <g>
            <circle cx="${c.x}" cy="${c.y}" r="5" fill="#090d16" stroke="#38bdf8" stroke-width="3" />
            <text x="${c.x}" y="${c.y - 10}" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="bold">
              ${c.topWeight}${state.settings.unit}×${c.topReps}
            </text>
            <text x="${c.x}" y="${height - 8}" text-anchor="middle" fill="#64748b" font-size="10">
              ${c.date}
            </text>
          </g>
        `).join('')}
      </svg>
    </div>
  `;
}

function renderHistoryTab() {
  const allExercises = Object.values(WORKOUT_PLAN).flatMap(d =>
    d.exercises.map(ex => ({ ...ex, dayShort: d.shortTitle }))
  );

  const latestBw = getLatestBodyweight();
  const targetBw = state.settings.targetBodyweight || 80;
  const bwDiff = latestBw ? (targetBw - latestBw).toFixed(1) : null;

  const historyListHtml = state.workoutHistory.length === 0
    ? `
      <div class="glass-panel rounded-2xl p-8 text-center">
        <div class="text-3xl mb-2">📋</div>
        <h3 class="text-base font-bold text-white">No Workouts Logged Yet</h3>
        <p class="text-xs text-slate-400 mt-1">Log your first session in the Workout Logger tab to build your permanent training history.</p>
      </div>
    `
    : state.workoutHistory.map(sess => {
        const exSummaryHtml = (sess.exercises || []).map(ex => {
          const completedSets = (ex.sets || []).filter(s => s.completed || s.reps > 0);
          if (completedSets.length === 0) return '';
          const setsBadge = completedSets.map(s => `${s.weight}${state.settings.unit} × ${s.reps}`).join('  |  ');
          return `
            <div class="py-2 border-b border-slate-800/60 last:border-none flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span class="text-xs font-semibold text-slate-200">${ex.name}</span>
              <span class="text-xs font-mono text-sky-300">${setsBadge}</span>
            </div>
          `;
        }).join('');

        return `
          <div class="glass-panel rounded-2xl p-4 sm:p-5 mb-4">
            <div class="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">${sess.shortTitle || sess.dayId}</span>
                  <span class="text-xs font-semibold text-slate-300">${sess.date}</span>
                  ${sess.bodyweight ? `<span class="text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-medium">⚖️ ${sess.bodyweight} ${state.settings.unit}</span>` : ''}
                </div>
                <h4 class="text-base font-bold text-white mt-1">${sess.dayTitle}</h4>
              </div>
              <div class="flex items-center gap-3">
                <div class="text-right">
                  <div class="text-xs text-slate-400">${sess.totalSets || 0} sets</div>
                  <div class="text-sm font-bold text-emerald-400">${(sess.totalVolume || 0).toLocaleString()} ${state.settings.unit} vol</div>
                </div>
                <button onclick="deleteWorkoutSession('${sess.id}')" class="p-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-950 text-slate-400 hover:text-rose-300 text-xs" title="Delete session">
                  🗑
                </button>
              </div>
            </div>
            <div class="mt-2">
              ${exSummaryHtml}
            </div>
            ${sess.sessionNotes ? `<div class="mt-3 p-2.5 rounded-xl bg-slate-900/70 text-xs text-slate-300 italic">📝 "${sess.sessionNotes}"</div>` : ''}
          </div>
        `;
      }).join('');

  return `
    <div class="tab-content space-y-6">
      <!-- Top Summary Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="glass-panel rounded-2xl p-4">
          <div class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Workouts Logged</div>
          <div class="text-2xl font-extrabold text-white mt-1">${state.workoutHistory.length}</div>
          <div class="text-xs text-sky-400 mt-1">Target: 5 sessions / week (Superman Split)</div>
        </div>
        <div class="glass-panel rounded-2xl p-4">
          <div class="text-xs font-bold uppercase tracking-wider text-slate-400">Current Bodyweight</div>
          <div class="text-2xl font-extrabold text-white mt-1">
            ${latestBw ? `${latestBw} ${state.settings.unit}` : '—'}
          </div>
          <div class="text-xs text-amber-400 mt-1">
            Target: 80.0 kg @ ~11% BF ${bwDiff !== null ? `(${bwDiff > 0 ? '+' + bwDiff : bwDiff} ${state.settings.unit} to go)` : ''}
          </div>
        </div>
        <div class="glass-panel rounded-2xl p-4">
          <div class="text-xs font-bold uppercase tracking-wider text-slate-400">Quick Log Bodyweight</div>
          <div class="flex items-center gap-2 mt-2">
            <input
              id="quick-bw-input"
              type="number"
              step="0.1"
              placeholder="e.g. 77.2"
              value="${latestBw || ''}"
              class="gym-input py-1.5 px-2.5 text-sm w-28"
            />
            <button
              onclick="logBodyweightEntry(getTodayDateString(), document.getElementById('quick-bw-input').value, true)"
              class="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <!-- Progressive Overload Exercise Chart -->
      <div class="glass-panel rounded-2xl p-4 sm:p-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-sky-400">Progressive Mechanical Tension</span>
            <h3 class="text-lg font-bold text-white">Strength Progression Curve (Top Set)</h3>
          </div>
          <select
            onchange="state.selectedChartExerciseId = this.value; renderApp();"
            class="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-sky-400"
          >
            ${allExercises.map(ex => `
              <option value="${ex.id}" ${state.selectedChartExerciseId === ex.id ? 'selected' : ''}>
                [${ex.dayShort}] ${ex.name}
              </option>
            `).join('')}
          </select>
        </div>
        ${renderExerciseChartSvg(state.selectedChartExerciseId)}
      </div>

      <!-- Session History List -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-bold text-white">Workout Session Log</h3>
          <button onclick="exportJsonBackup()" class="text-xs text-sky-400 hover:text-sky-300 font-semibold">
            ⬇ Export JSON Backup
          </button>
        </div>
        ${historyListHtml}
      </div>
    </div>
  `;
}

// ============================================================================
// NUTRITION & MACRO PROTOCOL TAB
// ============================================================================
function renderNutritionTab() {
  const todayMacros = getTodayMacros();
  const cals = (todayMacros.protein * 4) + (todayMacros.carbs * 4) + (todayMacros.fat * 9);
  const targetCals = 2700;
  const calPct = Math.min(100, Math.round((cals / targetCals) * 100));

  return `
    <div class="tab-content space-y-6">
      <div class="glass-panel rounded-2xl p-5 border-t-2 border-t-emerald-400">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">Controlled Lean Surplus (+150–200 kcal)</span>
            <h2 class="text-xl font-extrabold text-white">Daily Nutrition & Macro Calculator (${getTodayDateString()})</h2>
            <p class="text-xs text-slate-400 mt-0.5">Target gain rate: 0.4–0.6 kg/month toward 80 kg @ ~11% BF</p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-extrabold text-white">${cals.toLocaleString()} <span class="text-sm font-normal text-slate-400">/ 2,700 kcal</span></div>
            <div class="text-xs text-emerald-400 font-mono">P×4 + C×4 + F×9 (${calPct}%)</div>
          </div>
        </div>

        <!-- Macro Controls Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Protein -->
          <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs font-bold uppercase text-sky-400">Protein (2.0 g/kg)</span>
              <span class="text-xs text-slate-400">Target: <strong>150–160 g</strong></span>
            </div>
            <div class="flex items-center gap-2 my-2">
              <input
                type="number"
                value="${todayMacros.protein}"
                oninput="updateTodayMacro('protein', this.value)"
                class="gym-input w-24 py-2 text-base"
              />
              <span class="text-sm text-slate-400">g</span>
              <div class="ml-auto flex gap-1">
                <button onclick="quickAddMacro('protein', 25)" class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-sky-300">+25g</button>
                <button onclick="quickAddMacro('protein', 40)" class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-sky-300">+40g</button>
              </div>
            </div>
            <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div class="bg-sky-400 h-full" style="width: ${Math.min(100, (todayMacros.protein / 160) * 100)}%"></div>
            </div>
          </div>

          <!-- Carbohydrates -->
          <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs font-bold uppercase text-amber-400">Total Carbs (4.8–5.0 g/kg)</span>
              <span class="text-xs text-slate-400">Target: <strong>365–380 g</strong></span>
            </div>
            <div class="flex items-center gap-2 my-2">
              <input
                type="number"
                value="${todayMacros.carbs}"
                oninput="updateTodayMacro('carbs', this.value)"
                class="gym-input w-24 py-2 text-base"
              />
              <span class="text-sm text-slate-400">g</span>
              <div class="ml-auto flex gap-1">
                <button onclick="quickAddMacro('carbs', 45)" class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-amber-300">+45g</button>
                <button onclick="quickAddMacro('carbs', 75)" class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-amber-300">+75g</button>
              </div>
            </div>
            <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div class="bg-amber-400 h-full" style="width: ${Math.min(100, (todayMacros.carbs / 380) * 100)}%"></div>
            </div>
          </div>

          <!-- Fats -->
          <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs font-bold uppercase text-rose-400">Dietary Fats (0.85–0.9 g/kg)</span>
              <span class="text-xs text-slate-400">Target: <strong>65–70 g</strong></span>
            </div>
            <div class="flex items-center gap-2 my-2">
              <input
                type="number"
                value="${todayMacros.fat}"
                oninput="updateTodayMacro('fat', this.value)"
                class="gym-input w-24 py-2 text-base"
              />
              <span class="text-sm text-slate-400">g</span>
              <div class="ml-auto flex gap-1">
                <button onclick="quickAddMacro('fat', 10)" class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-rose-300">+10g</button>
                <button onclick="quickAddMacro('fat', 20)" class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-rose-300">+20g</button>
              </div>
            </div>
            <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div class="bg-rose-400 h-full" style="width: ${Math.min(100, (todayMacros.fat / 70) * 100)}%"></div>
            </div>
          </div>
        </div>

        <!-- Nutrition Protocol Rules -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 text-xs text-slate-300">
          <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 class="font-bold text-white mb-1">⚖️ Calories vs. Macros Law</h4>
            <p class="leading-relaxed text-slate-400">
              Calories dictate the <em>speed</em> of weight gain, while macros dictate the <em>composition</em> of that gain. Because calories and macros are mathematically linked (<code class="text-sky-300">P×4 + C×4 + F×9</code>), hitting all three macro targets automatically fulfills your ~2,700 kcal goal.
            </p>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 class="font-bold text-white mb-1">🍎 The Fiber & Fruit Rule</h4>
            <p class="leading-relaxed text-slate-400">
              Count <strong>Total Carbohydrates</strong> (including dietary fiber from fruit) rather than net carbs. Once your protein, fat, and total carb targets are met, stop eating for the day. Pair high-fiber fruits with denser, low-fiber carbs (white rice, bananas, sweet potatoes, oats) to avoid excessive stomach fullness.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// BIOMECHANICAL & STRATEGY REFERENCE VAULT TAB
// ============================================================================
function renderBlueprintTab() {
  return `
    <div class="tab-content space-y-5">
      <!-- Section 1: Core Goal & Biomechanical Constraints -->
      <div class="glass-panel rounded-2xl p-5">
        <span class="text-xs font-bold uppercase tracking-wider text-sky-400">Section 1</span>
        <h2 class="text-lg font-extrabold text-white mt-0.5 mb-3">Core Goal & Biomechanical Constraints</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
          <div class="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <div class="font-bold text-white mb-1">🦸‍♂️ Physique & Physiological Target</div>
            <p class="text-slate-400 leading-relaxed">
              The classic <strong>"Superman" silhouette</strong>—wide V-taper, capped lateral deltoids, high clavicular chest shelf, broad iliac lats, dense limbs, and a tight, narrow waist. Target: <strong>80 kg bodyweight at ~11% body fat</strong> via progressive mechanical tension.
            </p>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div class="font-bold text-rose-400">🛡️ Injury & Structural Safeguards</div>
            <p class="text-slate-400 text-xs leading-relaxed">
              • <strong>Lumbar Radiculopathy (Pinched Nerve History):</strong> Triggered by spinal flexion under load, horizontal shear stress, or heavy axial compression.<br/>
              • <strong>Restricted Hip Mobility:</strong> Tight hip capsules & flexors cause early pelvic tuck ("butt wink") and transfer pickleball court shock to the lumbar spine.<br/>
              • <strong>Flat Feet (Overpronation):</strong> Collapsed arches cause inward tibial rotation & valgus knee torque during standard leg presses.
            </p>
          </div>
        </div>
      </div>

      <!-- Section 2: Strategic Exercise & Anatomical Decisions -->
      <div class="glass-panel rounded-2xl p-5">
        <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">Section 2</span>
        <h2 class="text-lg font-extrabold text-white mt-0.5 mb-3">Strategic Exercise & Anatomical Decisions</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div class="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <h4 class="font-bold text-white mb-1.5">Why No OHP or Lower Chest Work</h4>
            <p class="text-slate-400 leading-relaxed">
              • <strong>Overhead Press Excluded:</strong> Incline/flat presses heavily stimulate front delts. Shoulder width comes strictly from <strong>lateral deltoids</strong> (cable & machine lateral raises).<br/><br/>
              • <strong>Decline / Dips Excluded:</strong> Avoids bottom-heavy rounded chest. <strong>25°–30° incline presses</strong> square off the upper clavicular shelf.
            </p>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <h4 class="font-bold text-white mb-1.5">Eliminating High-Risk Movements</h4>
            <p class="text-slate-400 leading-relaxed">
              • <strong>RDLs & Loaded Crunches Removed:</strong> Even machine RDLs create excessive horizontal spinal shear and sciatic nerve tension; loaded crunches force lumbar flexion.<br/><br/>
              • <strong>Standing Calf Raises & Hack Squats Removed:</strong> Both place direct axial compression down the vertebral column.
            </p>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
            <h4 class="font-bold text-white mb-1.5">Lower-Body Joint & Spine Upgrades</h4>
            <p class="text-slate-400 leading-relaxed">
              • <strong>Pre-Exhaust Sequencing:</strong> Leg Curls + Extensions <em>before</em> Leg Press cushions knees and cuts required spinal/knee load by 25–30%.<br/><br/>
              • <strong>Single-Leg 45° Press (Flat Backrest):</strong> Non-working foot on floor stabilizes pelvis. Tripod foot cue + Seated Hip Abductions fix knee cave.
            </p>
          </div>
        </div>
      </div>

      <!-- Section 3: Equipment & Execution Mechanics -->
      <div class="glass-panel rounded-2xl p-5">
        <span class="text-xs font-bold uppercase tracking-wider text-amber-400">Section 3</span>
        <h2 class="text-lg font-extrabold text-white mt-0.5 mb-3">Equipment & Execution Mechanics</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div class="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div><strong class="text-white">🔗 Lifting Straps Over Gloves:</strong> Skip gloves (they thicken handle diameter and weaken grip). Use straps on lat pulldowns & chest-supported rows so forearm fatigue never limits back growth.</div>
            <div><strong class="text-white">🚫 No Weightlifting Belt:</strong> Unnecessary with axial squats/RDLs removed. Never wear a tight belt on the leg press—it pinches the hip crease and restricts pelvic alignment.</div>
            <div><strong class="text-white">⚙️ Pivoted Lever Plate Loading:</strong> Always load primary plates onto the <strong>upper horns</strong> first (longer lever arm from fulcrum = true mechanical resistance).</div>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div class="font-bold text-white">🎯 RIR (Reps in Reserve) Protocol</div>
            <div class="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200">
              <strong>1–2 RIR on Multi-Joint Compounds</strong> (Leg Press, Hip Thrust, Incline Press, Pulldowns, Rows): Stop 1 to 2 reps shy of failure so pelvic or spinal positioning never breaks down under exhaustion.
            </div>
            <div class="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
              <strong>0 RIR on Supported Isolations</strong> (Lateral Raises, Leg Curls/Extensions, Arms, Calves, Abductions): Push safely to technical failure since the spine is completely decoupled from the load.
            </div>
          </div>
        </div>
      </div>

      <!-- Section 4: The 5-Day "Superman" Specialization Upgrades -->
      <div class="glass-panel rounded-2xl p-5 border-t-2 border-t-indigo-400">
        <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">Section 4 • Hypertrophy Optimization</span>
        <h2 class="text-lg font-extrabold text-white mt-0.5 mb-3">Why the 5-Day "Superman" Split Beats 6-Day PPL</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div class="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div class="font-bold text-white">⚡ 1. Unfatigued Motor Unit Recruitment (Day 5 Delts & Arms)</div>
            <p class="text-slate-400 leading-relaxed">
              In a 6-day PPL or standard 4-day split, arms and side delts are buried at the end of Push/Pull sessions when central nervous system (CNS) fatigue reduces high-threshold motor unit recruitment by 20–30%. Adding <strong>Day 5 (Saturday: 3D Delts, Dense Limbs & Core)</strong> trains your V-taper and arms when your nervous system is 100% fresh—with <strong>zero spinal or hip load</strong>.
            </p>
            <div class="font-bold text-white pt-1">📐 2. 3×/Week Side Delt & 2×/Week Vertical + Horizontal Back</div>
            <p class="text-slate-400 leading-relaxed">
              Side delts are hit 3×/week (Mon/Thu/Sat = 10 high-quality sets). Both Upper 1 and Upper 2 now include <strong>1 Vertical Pull + 1 Chest-Supported Row</strong> (including a 45°-flared upper-back row on Upper 2 for rhomboids/traps and a Seated Pec Deck Fly for stretched horizontal adduction).
            </p>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div class="font-bold text-white">🔬 3. Stretch-Mediated Hypertrophy Upgrades</div>
            <p class="text-slate-400 leading-relaxed">
              • <strong>Seated Leg Curl Over Lying Leg Curl (Lower 2):</strong> Because the hamstrings cross both the hip and knee, sitting at a 90° hip angle stretches the hamstrings and produces <strong>1.5× greater hypertrophy</strong> than lying leg curls (Maeo et al., 2020) while eliminating lower-back arching.<br/><br/>
              • <strong>Overhead Cable Triceps Extensions (Upper 1 & Day 5):</strong> Elevating the upper arms stretches the biarticular triceps long head, producing <strong>~40% greater triceps growth</strong> than arms-at-side pushdowns alone (Maeo et al., 2022).<br/><br/>
              • <strong>Wall-Press Dead-Bugs (Day 5):</strong> Builds thick rectus abdominis ("6-pack") blocks via anti-extension tension with zero lumbar flexion.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// CLOUD SYNC & DATABASE SETTINGS TAB
// ============================================================================
function renderSyncTab() {
  return `
    <div class="tab-content space-y-6">
      <!-- Hevy Official API Live Sync Card -->
      <div class="glass-panel rounded-2xl p-5 border-t-2 border-t-emerald-400">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">Official Hevy v1 Developer API • Connected</span>
            <h2 class="text-xl font-extrabold text-white mt-0.5">🏋️‍♂️ Hevy App Live Sync & Routine Integration</h2>
          </div>
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            ✓ All 5 Superman Routines Synced to Hevy
          </span>
        </div>
        <p class="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
          Your <strong>Hevy account</strong> is directly linked via the official Hevy v1 API. All 5 upgraded <strong>"Superman" Specialization Routines</strong> (including your custom machines, working weights, and Chinese gym setup notes <code class="text-emerald-300">集巨 / 健工</code>) are live in your Hevy app, and your past Hevy workouts are pre-loaded into your charts and set logger.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <label class="block text-xs text-slate-400">Hevy Developer API Key (<code class="text-emerald-300">api.hevyapp.com/v1</code>)</label>
            <input
              type="password"
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              value="${state.settings.hevyApiKey || ''}"
              oninput="state.settings.hevyApiKey = this.value; saveStateToStorage();"
              class="gym-input w-full py-2 px-3 text-xs text-left font-mono"
            />
            <label class="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
              <input
                type="checkbox"
                ${state.settings.autoSyncHevy ? 'checked' : ''}
                onchange="state.settings.autoSyncHevy = this.checked; saveStateToStorage();"
                class="rounded accent-emerald-400"
              />
              <span>Automatically log completed web workouts to my Hevy account</span>
            </label>
            ${state.settings.lastHevySyncTime ? `<div class="text-[11px] text-emerald-400">Status: ${state.settings.lastHevySyncTime}</div>` : ''}
            <div class="flex flex-wrap gap-2 pt-1">
              <button
                onclick="pullFromHevyApi(false)"
                class="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-all"
              >
                ⬇ Pull Latest Workouts from Hevy
              </button>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
            <div class="font-bold text-white mb-1">📋 Active Routines Updated on Your Hevy Account:</div>
            <div class="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 text-slate-300">
              <span class="text-sky-400 font-bold">1. Upper A:</span> Chest, Lats & Arms <span class="text-emerald-400">(7 exercises + Arm Superset)</span>
            </div>
            <div class="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 text-slate-300">
              <span class="text-sky-400 font-bold">2. Lower A:</span> Quads, Calves & Core <span class="text-emerald-400">(5 exercises • Pre-Exhausted)</span>
            </div>
            <div class="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 text-slate-300">
              <span class="text-sky-400 font-bold">3. Upper B:</span> Upper Back, Chest & Delts <span class="text-emerald-400">(6 exercises • High Row, Pec Deck & Rear Delts)</span>
            </div>
            <div class="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 text-slate-300">
              <span class="text-sky-400 font-bold">4. Lower B:</span> Glutes, Hamstrings & Hips <span class="text-emerald-400">(5 exercises • Seated Leg Curl)</span>
            </div>
            <div class="p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-200">
              <span class="text-indigo-400 font-bold">5. Upper C:</span> 3D Delts, Arms & Abs <span class="text-emerald-400">(7 exercises • Fresh CNS Priority)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Storage Architecture Overview -->
      <div class="glass-panel rounded-2xl p-5 border-t-2 border-t-sky-400">
        <span class="text-xs font-bold uppercase tracking-wider text-sky-400">100% Free • Permanent • Zero Inactive Pausing</span>
        <h2 class="text-xl font-extrabold text-white mt-0.5">Hybrid Database & GitHub Cloud Sync</h2>
        <p class="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
          Your workouts save instantaneously to your device's browser storage (<code class="text-sky-300">localStorage</code>) and can automatically sync to a private <strong>GitHub Gist</strong> on your own GitHub account. Unlike free-tier SQL databases that pause after 7 days of inactivity, GitHub Gists are <strong>100% free forever, never pause, and retain full Git revision history</strong> of every workout you ever log.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <!-- GitHub Cloud Sync Configuration -->
          <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-white">☁️ GitHub Gist Cloud Sync</h3>
              <span class="text-[11px] px-2 py-0.5 rounded-full ${state.settings.githubGistId ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}">
                ${state.settings.githubGistId ? 'Connected' : 'Optional Setup'}
              </span>
            </div>

            <div>
              <label class="block text-xs text-slate-400 mb-1">GitHub Personal Access Token (with <code class="text-sky-300">gist</code> permission)</label>
              <input
                type="password"
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                value="${state.settings.githubToken || ''}"
                oninput="state.settings.githubToken = this.value; saveStateToStorage();"
                class="gym-input w-full py-2 px-3 text-xs text-left"
              />
            </div>

            <div>
              <label class="block text-xs text-slate-400 mb-1">Gist ID (Auto-filled on first Push, or paste existing Gist ID to link another device)</label>
              <input
                type="text"
                placeholder="Leave blank to create new private Gist automatically"
                value="${state.settings.githubGistId || ''}"
                oninput="state.settings.githubGistId = this.value; saveStateToStorage();"
                class="gym-input w-full py-2 px-3 text-xs text-left font-mono"
              />
            </div>

            <label class="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
              <input
                type="checkbox"
                ${state.settings.autoSyncGithub ? 'checked' : ''}
                onchange="state.settings.autoSyncGithub = this.checked; saveStateToStorage();"
                class="rounded accent-sky-400"
              />
              <span>Auto-sync to GitHub Cloud whenever I finish a workout</span>
            </label>

            ${state.settings.lastSyncTime ? `<div class="text-[11px] text-emerald-400">Last synced: ${state.settings.lastSyncTime}</div>` : ''}

            <div class="flex flex-wrap gap-2 pt-2">
              <button
                onclick="syncToGitHubGist(false)"
                class="flex-1 py-2 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
              >
                ⬆ Push Local DB to GitHub
              </button>
              <button
                onclick="pullFromGitHubGist()"
                class="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs"
              >
                ⬇ Pull DB from GitHub
              </button>
            </div>
          </div>

          <!-- Local File Backup & App Preferences -->
          <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 class="text-sm font-bold text-white">💾 Direct JSON File Backup & Restore</h3>
            <p class="text-xs text-slate-400 leading-relaxed">
              Download a complete copy of your workout history, bodyweight logs, and macro logs as a <code class="text-sky-300">.json</code> file at any time, or restore from a backup file.
            </p>

            <div class="flex flex-wrap gap-2">
              <button
                onclick="exportJsonBackup()"
                class="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-bold text-xs"
              >
                ⬇ Export Backup (.json)
              </button>
              <label class="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs text-center cursor-pointer">
                ⬆ Import Backup (.json)
                <input type="file" accept=".json" onchange="importJsonBackup(event)" class="hidden" />
              </label>
            </div>

            <div class="pt-3 border-t border-slate-800">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Weight Unit Preference</label>
              <div class="flex gap-2">
                <button
                  onclick="state.settings.unit = 'kg'; saveStateToStorage(); renderApp();"
                  class="px-4 py-1.5 rounded-lg text-xs font-bold border ${state.settings.unit === 'kg' ? 'bg-sky-500 text-slate-950 border-sky-400' : 'bg-slate-800 text-slate-400 border-slate-700'}"
                >
                  Kilograms (kg)
                </button>
                <button
                  onclick="state.settings.unit = 'lbs'; saveStateToStorage(); renderApp();"
                  class="px-4 py-1.5 rounded-lg text-xs font-bold border ${state.settings.unit === 'lbs' ? 'bg-sky-500 text-slate-950 border-sky-400' : 'bg-slate-800 text-slate-400 border-slate-700'}"
                >
                  Pounds (lbs)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// MASTER RENDER
// ============================================================================
function renderApp() {
  const navContainer = document.getElementById('main-nav-tabs');
  const mainContainer = document.getElementById('app-main-content');
  if (!mainContainer) return;

  const tabs = [
    { id: 'workout', label: '🏋️‍♂️ Workout Logger' },
    { id: 'history', label: `📈 History & Charts (${state.workoutHistory.length})` },
    { id: 'nutrition', label: '🥩 2,700 kcal Macros' },
    { id: 'blueprint', label: '🛡️ Biomechanics Vault' },
    { id: 'sync', label: '☁️ Cloud DB & Backup' }
  ];

  if (navContainer) {
    navContainer.innerHTML = tabs.map(t => {
      const active = state.activeTab === t.id;
      return `
        <button
          onclick="switchTab('${t.id}')"
          class="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            active
              ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }"
        >
          ${t.label}
        </button>
      `;
    }).join('');
  }

  if (state.activeTab === 'workout') {
    mainContainer.innerHTML = renderWorkoutTab();
  } else if (state.activeTab === 'history') {
    mainContainer.innerHTML = renderHistoryTab();
  } else if (state.activeTab === 'nutrition') {
    mainContainer.innerHTML = renderNutritionTab();
  } else if (state.activeTab === 'blueprint') {
    mainContainer.innerHTML = renderBlueprintTab();
  } else if (state.activeTab === 'sync') {
    mainContainer.innerHTML = renderSyncTab();
  }

  renderTimerBar();
}

window.addEventListener('DOMContentLoaded', () => {
  loadStateFromStorage();
  renderApp();
});
