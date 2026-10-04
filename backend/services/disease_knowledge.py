"""
Disease Knowledge Base for PlantCare AI
Contains comprehensive agricultural profiles, symptoms, causes, treatments, and prevention guidelines
based on standard phytopathology literature and the PlantVillage classification schema.
"""

from typing import Dict, Any, Optional

DISEASE_DATABASE: Dict[str, Dict[str, Any]] = {
    # ------------------ TOMATO ------------------
    "Tomato___Early_blight": {
        "plant": "Tomato",
        "disease": "Early Blight",
        "scientificName": "Alternaria solani",
        "status": "Diseased",
        "severity": "Moderate",
        "symptoms": [
            "Concentric ring 'bullseye' target-like dark brown to black spots on older leaves",
            "Yellowing (chlorosis) halo surrounding lesions, leading to premature leaf drop",
            "Sunken dark lesions on stems near soil level causing collar rot",
            "Defoliation exposing developing fruits to sunscald"
        ],
        "causes": [
            "Alternaria solani fungal pathogen surviving in infected plant debris and soil",
            "Prolonged periods of warm temperatures (24°C–29°C / 75°F–85°F) with high humidity",
            "Frequent rainfall, overhead sprinkler watering, or heavy morning dew",
            "Nutrient-deficient, stressed, or densely planted tomato plants"
        ],
        "treatment": [
            "Prune and safely dispose of infected lower leaves; do not compost diseased foliage",
            "Apply copper-based fungicides or chlorothalonil at the earliest signs of spotting",
            "Use bio-fungicides like Bacillus subtilis or neem oil spray for organic management",
            "Stake or cage tomato plants to lift foliage off damp soil and enhance air circulation"
        ],
        "prevention": [
            "Rotate crops on a 3- to 4-year cycle away from solanaceous plants (potatoes, eggplants, peppers)",
            "Employ drip irrigation or soaker hoses to keep foliage dry during irrigation",
            "Apply a 2-3 inch organic mulch layer (straw or wood shavings) to prevent soil splash",
            "Select certified disease-resistant tomato cultivars (e.g., Mountain Supreme, Defiant)"
        ]
    },
    "Tomato___Late_blight": {
        "plant": "Tomato",
        "disease": "Late Blight",
        "scientificName": "Phytophthora infestans",
        "status": "Diseased",
        "severity": "Critical",
        "symptoms": [
            "Large, water-soaked pale green to dark brown irregular lesions on foliage and stems",
            "Delicate white fuzzy fungal sporulation on leaf undersides in humid conditions",
            "Rapid browning and collapse of entire leaf clusters and green stems",
            "Firm, leathery, dark brown blotches on green and ripening tomato fruit"
        ],
        "causes": [
            "Oomycete organism Phytophthora infestans (historically responsible for the Irish Potato Famine)",
            "Cool to moderate temperatures (15°C–21°C / 60°F–70°F) combined with continuous moisture (>90% RH)",
            "Spreading by windborne sporangia travelling miles from neighboring infected fields",
            "Infected seed tubers, cull piles, or volunteers surviving mild winters"
        ],
        "treatment": [
            "Immediately bag and remove all infected plants during dry weather; destroy to avoid spreading spores",
            "Apply preventative systemic and contact fungicides (mancozeb, chlorothalonil, or cymoxanil) before rains",
            "In commercial fields, alert regional agricultural extension services if late blight is confirmed",
            "Thoroughly clean all pruning shears and tools with 10% bleach or isopropyl alcohol between cuts"
        ],
        "prevention": [
            "Plant certified late blight resistant cultivars such as Iron Lady, Defiant PhR, or Mountain Magic",
            "Ensure wide spacing (60–90 cm) between plants to accelerate foliage drying after precipitation",
            "Never water overhead; install low-pressure drip irrigation at the soil base",
            "Eliminate all volunteer potato and tomato plants around garden perimeters"
        ]
    },
    "Tomato___Bacterial_spot": {
        "plant": "Tomato",
        "disease": "Bacterial Spot",
        "scientificName": "Xanthomonas perforans",
        "status": "Diseased",
        "severity": "Moderate to High",
        "symptoms": [
            "Small (1-3 mm), dark, angular water-soaked spots on leaves that turn greasy black",
            "Centers of older leaf lesions may dry out and crack open, creating a ragged appearance",
            "Raised, blister-like scabby spots on tomato fruits with sunken dark margins",
            "General leaf chlorosis and substantial premature defoliation during rainy seasons"
        ],
        "causes": [
            "Xanthomonas bacterial strains entering through natural stomata or wound openings",
            "Splattering raindrops, wind-driven moisture, and warm temperatures (24°C–30°C)",
            "Contaminated seed stock or infected transplant seedlings",
            "Working or cultivating in fields while tomato foliage is wet"
        ],
        "treatment": [
            "Apply fixed copper sprays combined with mancozeb for synergistic bacterial suppression",
            "Spray bactericides containing streptomycin on young seedlings in accordance with local regulations",
            "Immediately remove severely infected seedlings in nursery or greenhouse settings",
            "Avoid handling foliage when wet to halt mechanical bacterial transmission"
        ],
        "prevention": [
            "Use hot water-treated (50°C for 25 min) or certified pathogen-free tomato seeds",
            "Rotate crops with non-host families (such as legumes or grasses) for at least 2 years",
            "Disinfect stakes, seedling trays, and trellises before reuse using a 10% sodium hypochlorite solution",
            "Avoid overhead sprinkler irrigation and promote morning sun exposure"
        ]
    },
    "Tomato___healthy": {
        "plant": "Tomato",
        "disease": "Healthy Leaf",
        "scientificName": "Solanum lycopersicum",
        "status": "Healthy",
        "severity": "None",
        "symptoms": [
            "Vibrant, uniform green foliage without necrotic spots, halos, or water-soaking",
            "Crisp, firm leaf margins without curling, wilting, or abnormal blistering",
            "Healthy vascular veins with normal turgor pressure and active vegetative growth",
            "No visible fungal mycelium, bacterial exudates, or pest webbing detected"
        ],
        "causes": [
            "Optimal growing conditions: adequate sunlight (6-8 hours daily), balanced N-P-K nutrition",
            "Consistent soil moisture levels and effective soil drainage",
            "Good air circulation, hygiene, and proactive pest monitoring"
        ],
        "treatment": [
            "No chemical or corrective treatment required",
            "Maintain current balanced fertilizer regimen (high potassium and phosphorus during flowering)",
            "Prune non-productive suckers to maintain optimal airflow and light penetration"
        ],
        "prevention": [
            "Continue inspecting underside of leaves weekly for early signs of pests (aphids, hornworms)",
            "Maintain consistent drip watering to avoid blossom end rot and fungal splash",
            "Refresh soil mulch as needed to preserve ground moisture and suppress weeds"
        ]
    },

    # ------------------ POTATO ------------------
    "Potato___Late_blight": {
        "plant": "Potato",
        "disease": "Late Blight",
        "scientificName": "Phytophthora infestans",
        "status": "Diseased",
        "severity": "Critical",
        "symptoms": [
            "Dark water-soaked lesions appearing first on tips or margins of lower foliage",
            "White mildew-like growth visible on the undersides of leaves during damp mornings",
            "Purplish-brown tuber surface rot extending into dry, reddish-brown granular decay underneath skin",
            "Foul decaying odor in storage or field as secondary bacterial soft rots invade"
        ],
        "causes": [
            "Phytophthora infestans oomycete pathogen",
            "Extended cool, damp weather with relative humidity above 90%",
            "Infected seed potatoes planted directly into cool soil",
            "Windborne sporangiospores carried from distant affected potato or tomato fields"
        ],
        "treatment": [
            "Apply targeted systemic fungicides (metalaxyl, dimethomorph, or fluopicolide) upon detection",
            "Kill vines 2-3 weeks prior to tuber harvest using desiccants to stop spore wash into soil",
            "Remove and destroy infected tubers during sorting to protect storage bins",
            "Maintain good tuber hilling depth (10-15 cm) to shield developing potatoes from spore runoff"
        ],
        "prevention": [
            "Plant only certified disease-free seed tubers with blue tag verification",
            "Avoid low-lying field areas with poor air drainage or standing water",
            "Utilize blight forecasting services (e.g., BlightCast) to schedule preventative protective sprays",
            "Practice minimum 3-year crop rotation without potatoes or tomatoes"
        ]
    },
    "Potato___Early_blight": {
        "plant": "Potato",
        "disease": "Early Blight",
        "scientificName": "Alternaria solani",
        "status": "Diseased",
        "severity": "Moderate",
        "symptoms": [
            "Small brown-black spots with characteristic concentric rings on mature leaves",
            "Leaves turn yellow and dry up, clinging to the stems without falling immediately",
            "Tubers develop dark, slightly sunken circular corky lesions with raised margins",
            "Reduced tuber size and yield loss due to premature photosynthetic loss"
        ],
        "causes": [
            "Alternaria solani fungus",
            "Cycles of heavy morning dew alternating with warm, dry sunny afternoons",
            "Plant stress caused by drought, poor nitrogen levels, or heavy nematode pressure",
            "Overwintering in old potato vines and infected soil debris"
        ],
        "treatment": [
            "Apply protective fungicides like chlorothalonil, mancozeb, or azoxystrobin before canopy closure",
            "Supply balanced nitrogen top-dressing to prevent premature vine senescence",
            "Ensure gentle harvesting to minimize tuber skinning and mechanical bruises",
            "Allow tubers to cure for 10-14 days at 10°C–15°C with high humidity before long-term cold storage"
        ],
        "prevention": [
            "Plant tolerant potato cultivars with sturdy foliage",
            "Maintain optimal soil fertility throughout the tuber bulking stage",
            "Destroy potato vine residues thoroughly after harvest through deep tillage or composting",
            "Implement drip or overhead irrigation exclusively in early mornings so leaves dry by midday"
        ]
    },
    "Potato___healthy": {
        "plant": "Potato",
        "disease": "Healthy Leaf",
        "scientificName": "Solanum tuberosum",
        "status": "Healthy",
        "severity": "None",
        "symptoms": [
            "Robust deep green compound leaves with crisp edges and smooth venation",
            "Vigorous stem growth without cankers, streaks, or wilting",
            "No evidence of leaf chlorosis, mosaic mottling, or concentric spots"
        ],
        "causes": [
            "Healthy certified seed tubers planted in loose, well-draining acidic soil (pH 5.5 - 6.5)",
            "Proper hilling providing adequate tuber cover from sunlight",
            "Consistent moisture and balanced fertility"
        ],
        "treatment": [
            "No disease control measures required",
            "Maintain consistent hilling to protect underground tubers from sunlight greening (solanine)"
        ],
        "prevention": [
            "Continue regular scout walks for early Colorado potato beetle or aphid signs",
            "Ensure steady soil moisture during tuber initiation and bulking stages",
            "Monitor regional late blight forecasting bulletins"
        ]
    },

    # ------------------ APPLE ------------------
    "Apple___Apple_scab": {
        "plant": "Apple",
        "disease": "Apple Scab",
        "scientificName": "Venturia inaequalis",
        "status": "Diseased",
        "severity": "Moderate to High",
        "symptoms": [
            "Olive-green to velvety dark brown circular lesions on leaves and sepals",
            "Leaves curl, pucker, turn yellow, and drop prematurely in midsummer",
            "Corky, scabby brown lesions on fruit surface that may crack and stunt development",
            "Deformed, unmarketable apples with compromised storage shelf-life"
        ],
        "causes": [
            "Ascomycete fungus Venturia inaequalis",
            "Ascospores released from fallen overwintered apple leaves in wet spring weather",
            "Continuous leaf wetness for 6 to 24 hours at temperatures between 13°C–24°C",
            "Dense tree canopies that trap moisture and shade inner foliage"
        ],
        "treatment": [
            "Apply protective fungicides (captan, myclobutanil, or sulfur) from bud break to fruit development",
            "Rake and shred or compost fallen apple leaves in autumn to eliminate primary spore inoculum",
            "Apply 5% urea spray to orchard floor leaves in autumn to accelerate leaf decomposition",
            "Prune annual shoots in winter to open tree canopy to sunlight and rapid breeze drying"
        ],
        "prevention": [
            "Plant resistant apple varieties (e.g., Liberty, Prima, Freedom, Enterprise, GoldRush)",
            "Maintain generous orchard tree spacing and regular pruning schedules",
            "Install micro-sprinklers underneath tree canopies rather than high-angle overhead irrigation",
            "Scout orchards weekly starting at green tip stage"
        ]
    },
    "Apple___Black_rot": {
        "plant": "Apple",
        "disease": "Black Rot",
        "scientificName": "Botryosphaeria obtusa",
        "status": "Diseased",
        "severity": "High",
        "symptoms": [
            "'Frog-eye' leaf spots: small purple flecks expanding into tan circular spots with dark borders",
            "Firm, concentric dark brown to black rot on maturing fruit near the calyx end",
            "Sunken reddish-brown bark cankers on limbs that gradually girdle and kill branches",
            "Mummified dried black fruits remaining hanging on branches over winter"
        ],
        "causes": [
            "Botryosphaeria obtusa fungal pathogen",
            "Wounds from winter cold injury, fire blight cankers, or hail damage",
            "Dead wood and mummified fruit left unpruned in the orchard",
            "Warm wet weather (20°C–27°C) following bloom"
        ],
        "treatment": [
            "Prune out dead wood, cankered limbs, and fire blight strikes at least 15 cm below visible margins",
            "Remove and burn all mummified apples clinging to trees or fallen on orchard floor",
            "Apply thiophanate-methyl or captan sprays from silver tip stage through cover sprays",
            "Sterilize pruning equipment with 70% alcohol between cuts"
        ],
        "prevention": [
            "Prevent mechanical bark injury during mowing and harvesting operations",
            "Control codling moth and other fruit-wounding insects",
            "Maintain optimal tree vigor through soil tests and balanced fertilization",
            "Inspect and clear brush piles near orchard borders"
        ]
    },
    "Apple___healthy": {
        "plant": "Apple",
        "disease": "Healthy Leaf",
        "scientificName": "Malus domestica",
        "status": "Healthy",
        "severity": "None",
        "symptoms": [
            "Lush, leathery deep-green serrated leaves without chlorosis, spots, or powdery coating",
            "Normal shoot elongation with firm terminal buds and smooth bark",
            "Clean developing fruit without blemishes, spots, or russeting cracks"
        ],
        "causes": [
            "Balanced nitrogen-potassium soil fertility and adequate soil moisture",
            "Good open canopy architecture facilitating full sunlight penetration",
            "Regular seasonal preventative maintenance and integrated pest management (IPM)"
        ],
        "treatment": [
            "No chemical intervention necessary",
            "Continue standard orchard nutrition and seasonal fruit thinning"
        ],
        "prevention": [
            "Perform regular canopy aeration pruning during dormant season",
            "Inspect leaves for two-spotted spider mites or leafhoppers during dry periods",
            "Maintain bee-friendly pollinator strips between orchard rows"
        ]
    },

    # ------------------ CORN ------------------
    "Corn___Common_rust": {
        "plant": "Corn (Maize)",
        "disease": "Common Rust",
        "scientificName": "Puccinia sorghi",
        "status": "Diseased",
        "severity": "Moderate",
        "symptoms": [
            "Oval to elongate cinnamon-brown pustules scattered across both upper and lower leaf surfaces",
            "Pustules rupture epidermal tissue releasing powdery reddish-brown urediniospores",
            "Severe infections cause leaves to turn chlorotic, dry up, and die prematurely",
            "Reduced grain fill, stunted stalk growth, and potential lodging before harvest"
        ],
        "causes": [
            "Obligate biotrophic fungus Puccinia sorghi",
            "Spores carried northward each spring by prevailing jet-stream air currents",
            "Moderate temperatures (16°C–25°C / 60°F–77°F) with high relative humidity and free moisture",
            "Planting susceptible sweet corn or field corn hybrids"
        ],
        "treatment": [
            "Apply strobilurin or triazole class fungicides (e.g., azoxystrobin + propiconazole) if rust reaches ear leaf before silking",
            "Evaluate economic threshold: apply treatment if rust covers >5% leaf area on sweet corn",
            "In silage or grain fields, harvest early if stalk integrity is compromised to prevent lodging",
            "Ensure post-harvest crop residue burial to minimize local saprophytic build-up"
        ],
        "prevention": [
            "Plant resistant corn hybrids containing the Rp1-D resistance gene",
            "Plant early in the season to minimize exposure to peak spore migration periods",
            "Avoid excessive nitrogen fertilization which produces excessively lush, susceptible leaf tissue",
            "Scout whorls and lower leaves weekly prior to tassel emergence"
        ]
    },
    "Corn___healthy": {
        "plant": "Corn (Maize)",
        "disease": "Healthy Leaf",
        "scientificName": "Zea mays",
        "status": "Healthy",
        "severity": "None",
        "symptoms": [
            "Broad, elongated arching leaves with deep vibrant emerald color",
            "Smooth leaf surface without lesions, pustules, streaks, or stripe bands",
            "Strong central midrib and sturdy upright stalk structure"
        ],
        "causes": [
            "Optimal nitrogen availability during vegetative growth stages",
            "Adequate soil moisture and proper seedbed preparation",
            "Effective weed control reducing competition for sunlight and moisture"
        ],
        "treatment": [
            "No disease control measures necessary",
            "Ensure timely side-dress nitrogen application before canopy closure (V6-V8 stage)"
        ],
        "prevention": [
            "Monitor soil moisture levels closely during pollination and kernel dough stages",
            "Rotate crops annually with soybeans, alfalfa, or other legumes to disrupt pest cycles",
            "Maintain soil organic matter through reduced tillage practices"
        ]
    },

    # ------------------ GRAPE ------------------
    "Grape___Black_rot": {
        "plant": "Grape",
        "disease": "Black Rot",
        "scientificName": "Guignardia bidwellii",
        "status": "Diseased",
        "severity": "High to Critical",
        "symptoms": [
            "Small reddish-brown circular spots on leaves that enlarge with black pycnidia pimples",
            "Infected berries turn soft, pale brown, then rapidly shrivel into hard, black, wrinkled mummies",
            "Cane lesions appear as elongated black cankers with raised edges",
            "Total crop loss can occur within 48 to 72 hours of rain events during bloom"
        ],
        "causes": [
            "Guignardia bidwellii ascomycete fungus",
            "Overwinters in shriveled mummy berries hanging on the trellis or buried in soil",
            "Rain splash and warm temperatures (21°C–27°C) requiring only 6-7 hours of leaf wetness",
            "Dense unpruned vine canopy with restricted sun exposure"
        ],
        "treatment": [
            "Apply protective fungicides (myclobutanil, mancozeb, or kresoxim-methyl) from early shoot growth through veraison",
            "Drop and destroy all mummified grape clusters during winter pruning",
            "Canopy shoot tucking and leaf pulling in the fruiting zone to speed morning drying",
            "Remove wild grapevines within 500 feet of commercial vineyard perimeters"
        ],
        "prevention": [
            "Choose well-ventilated vineyard sites with south or east-facing sun exposure",
            "Train vines using open trellis systems (e.g., Vertical Shoot Positioning - VSP)",
            "Practice strict vineyard sanitation every winter",
            "Plant partially resistant French-American hybrid cultivars where pressure is extreme"
        ]
    },
    "Grape___healthy": {
        "plant": "Grape",
        "disease": "Healthy Leaf",
        "scientificName": "Vitis vinifera",
        "status": "Healthy",
        "severity": "None",
        "symptoms": [
            "Symmetrical palmate leaves with healthy green color and clean margins",
            "Clean petioles and tendrils without lesions, blisters, or speckling",
            "Healthy fruit clusters setting evenly with uniform berry sizing"
        ],
        "causes": [
            "Good air circulation achieved through precise canopy management and summer shoot positioning",
            "Well-drained soil with controlled irrigation preventing vigorous vine stress",
            "Effective preventative spray program timed to vine phenology"
        ],
        "treatment": [
            "No chemical intervention needed",
            "Perform selective leaf thinning around fruit zone to maximize sunlight and ventilation"
        ],
        "prevention": [
            "Monitor for powdery mildew and downy mildew indicators during humid spells",
            "Inspect vine cordons for signs of trunk disease cankers",
            "Maintain balanced cover crops between rows to suppress dust and erosion"
        ]
    },

    # ------------------ PEPPER (BELL) ------------------
    "Pepper__bell___Bacterial_spot": {
        "plant": "Bell Pepper",
        "disease": "Bacterial Spot",
        "scientificName": "Xanthomonas campestris pv. vesicatoria",
        "status": "Diseased",
        "severity": "Moderate to High",
        "symptoms": [
            "Small water-soaked blister-like spots on leaves that turn brown with yellow margins",
            "Significant leaf drop leaving pepper fruits exposed to sunscald",
            "Rough, raised circular warts and cracks on ripening bell peppers",
            "Stunted plant growth and decreased bloom retention"
        ],
        "causes": [
            "Bacterial pathogen Xanthomonas campestris pv. vesicatoria",
            "High relative humidity, wind-driven rain, and warm temperatures (24°C–32°C)",
            "Infected seed stocks and commercial transplant greenhouse carryover",
            "Working in wet foliage spreading bacteria across adjacent plants"
        ],
        "treatment": [
            "Apply copper bactericide mixed with mancozeb weekly during wet spells",
            "Remove and discard severely infected plants promptly",
            "Apply plant defense activators like acibenzolar-S-methyl (Actigard) before infections peak",
            "Avoid overhead irrigation entirely; convert to drip tape under plastic mulch"
        ],
        "prevention": [
            "Plant resistant pepper varieties (races 1-10 resistant hybrids available)",
            "Treat seeds with hot water (50°C for 25 minutes) or 1.2% sodium hypochlorite",
            "Maintain at least a 2-year rotation without Solanaceous relatives",
            "Sanitize all farm equipment, stakes, and crates after season conclusion"
        ]
    },
    "Pepper__bell___healthy": {
        "plant": "Bell Pepper",
        "disease": "Healthy Leaf",
        "scientificName": "Capsicum annuum",
        "status": "Healthy",
        "severity": "None",
        "symptoms": [
            "Glossy, emerald-green leaves with smooth leaf surfaces and crisp edges",
            "Strong vegetative stems bearing clean white blossoms and firm developing peppers",
            "No bacterial lesions, yellowing mottles, or leaf distortions"
        ],
        "causes": [
            "Warm growing temperatures (21°C–28°C) with rich, well-aerated loamy soil",
            "Steady moisture delivery via drip irrigation preventing moisture swings",
            "Adequate calcium levels in soil preventing blossom end rot"
        ],
        "treatment": [
            "No disease corrective measures required",
            "Support plants with stakes or netting to prevent heavy fruit loads from snapping branches"
        ],
        "prevention": [
            "Maintain consistent soil moisture through organic or plastic mulch",
            "Monitor for thrips and aphids which act as vectors for spotted wilt virus",
            "Avoid over-fertilizing with nitrogen which creates excessive foliage and lowers fruit set"
        ]
    },

    # ------------------ STRAWBERRY ------------------
    "Strawberry___Leaf_scorch": {
        "plant": "Strawberry",
        "disease": "Leaf Scorch",
        "scientificName": "Diplocarpon earlianum",
        "status": "Diseased",
        "severity": "Moderate",
        "symptoms": [
            "Numerous small, dark purple or irregular spots on upper leaf surfaces",
            "Spots lack white centers (unlike leaf spot), appearing uniform purple-brown",
            "Leaves turn purplish-red, curl upwards at edges, then brown and look burnt or scorched",
            "Weakened plant vigor, smaller berry harvest, and reduced runner production"
        ],
        "causes": [
            "Ascomycete fungus Diplocarpon earlianum",
            "Prolonged leaf wetness exceeding 9 hours with moderate temperatures (18°C–25°C)",
            "Overhead watering in crowded strawberry beds",
            "Overwintering in old infected leaves within the strawberry crown"
        ],
        "treatment": [
            "Apply protective fungicides (captan, pyraclostrobin, or thiophanate-methyl) in early spring",
            "Mow and renovate June-bearing strawberry beds immediately following final berry harvest",
            "Rake and remove scorched foliage to diminish overwintering fungal structures",
            "Thin daughter runners to improve bed aeration and expedite canopy drying"
        ],
        "prevention": [
            "Plant resistant strawberry cultivars (e.g., Allstar, Earliglow, Tribute)",
            "Plant in full sun with well-draining soil on raised beds",
            "Avoid sprinkler irrigation; switch to drip lines beneath straw mulch",
            "Renew strawberry planting beds every 3-4 years to avoid disease build-up"
        ]
    },
    "Strawberry___healthy": {
        "plant": "Strawberry",
        "disease": "Healthy Leaf",
        "scientificName": "Fragaria × ananassa",
        "status": "Healthy",
        "severity": "None",
        "symptoms": [
            "Vibrant trifoliate leaves with deep green color and prominent serrated edges",
            "Clean petioles with dense healthy crown growth",
            "No necrotic spots, scorch margins, powdery mildew, or curling"
        ],
        "causes": [
            "Slightly acidic (pH 5.8-6.5), fertile soil with excellent drainage",
            "Adequate winter straw mulching protecting crowns from freeze-thaw cycles",
            "Clean virus-indexed certified runner stock"
        ],
        "treatment": [
            "No chemical treatments needed",
            "Apply clean straw mulch beneath leaves to keep developing berries off bare wet soil"
        ],
        "prevention": [
            "Inspect crowns regularly for cyclamen mite or crown rot symptoms",
            "Water early in the morning so sun dries leaf surfaces quickly",
            "Remove spent berry stems and dead outer leaves during peak growth"
        ]
    },

    # ------------------ RICE ------------------
    "Rice___Bacterial_leaf_blight": {
        "plant": "Rice",
        "disease": "Bacterial Leaf Blight",
        "scientificName": "Xanthomonas oryzae pv. oryzae",
        "status": "Diseased",
        "severity": "High",
        "symptoms": [
            "Water-soaked to yellowish-green stripes on leaf margins near tips",
            "Lesions rapidly extend along veins, turning wavy, bleached straw-white",
            "Milky bacterial dew droplets (exudate) appearing on young lesions in early mornings",
            "Kresek phase: seedling wilting, leaf roll, and total plant death in young paddies"
        ],
        "causes": [
            "Xanthomonas oryzae pv. oryzae bacteria",
            "High humidity (>70%), rainfall storms, and warm temperatures (25°C–34°C)",
            "Excessive chemical nitrogen application making cell walls tender",
            "Irrigation water carrying bacteria from infected stubble or weed hosts"
        ],
        "treatment": [
            "Drain infected paddy fields for 3-4 days to arrest bacterial proliferation",
            "Spray copper hydroxide or validamycin according to regional extension recommendations",
            "Immediately halt all additional nitrogen top-dressing; apply potassium and zinc",
            "Burn or deeply plow post-harvest rice stubble and eradicate weed hosts (e.g., Leersia)"
        ],
        "prevention": [
            "Cultivate BLB-resistant rice varieties with multi-gene resistance (e.g., Xa21, Xa4)",
            "Adopt balanced N-P-K fertilization (avoid excessive nitrogen; increase potassium)",
            "Ensure wide seedling spacing in nurseries to allow adequate aeration",
            "Avoid deep, stagnant flood waters in paddy fields"
        ]
    },
    "Rice___healthy": {
        "plant": "Rice",
        "disease": "Healthy Leaf",
        "scientificName": "Oryza sativa",
        "status": "Healthy",
        "severity": "None",
        "symptoms": [
            "Uniform upright bright-green leaves with smooth leaf blades and sturdy ligules",
            "Strong tillers with normal root system anchoring in paddy soil",
            "Absence of blast spindle lesions, sheath blight blotches, or bacterial streaks"
        ],
        "causes": [
            "Controlled water management and optimal paddy leveling",
            "Balanced split-application of nitrogen, phosphorus, and potassium",
            "Certified clean seed certified free from seedborne pathogens"
        ],
        "treatment": [
            "No disease controls required",
            "Maintain optimal flood depth corresponding to current growth stage (panicle initiation)"
        ],
        "prevention": [
            "Monitor paddy edges for brown planthopper or stem borer infestations",
            "Practice alternate wetting and drying (AWD) water conservation when appropriate",
            "Maintain sanitary field borders free of alternative host weeds"
        ]
    },

    # ------------------ WHEAT ------------------
    "Wheat___Stripe_rust": {
        "plant": "Wheat",
        "disease": "Stripe Rust (Yellow Rust)",
        "scientificName": "Puccinia striiformis f. sp. tritici",
        "status": "Diseased",
        "severity": "High",
        "symptoms": [
            "Bright yellowish-orange pustules arranged in narrow, distinct parallel stripes along leaf veins",
            "Pustules rupture leaf epidermis to release powdery yellow urediniospores",
            "Severe leaf yellowing, desiccation, and early death of flag leaves",
            "Shriveled grain kernels and substantial yield losses of up to 40-70%"
        ],
        "causes": [
            "Puccinia striiformis fungus",
            "Cool, wet weather with night temperatures between 2°C–15°C and daytime 10°C–20°C",
            "Presence of free moisture or morning dew on leaves for at least 3-6 hours",
            "Planting susceptible winter or spring wheat varieties"
        ],
        "treatment": [
            "Apply systemic triazole or strobilurin fungicides (e.g., propiconazole, tebuconazole) at first sign",
            "Prioritize protection of the flag leaf (top leaf) as it provides 70% of grain fill energy",
            "Coordinate aerial or tractor spraying if disease reaches the leaf below flag leaf (F-1)",
            "Ensure post-harvest green bridge elimination of volunteer wheat"
        ],
        "prevention": [
            "Plant resistant wheat cultivars with durable adult plant resistance (APR genes)",
            "Avoid overly dense seeding rates that trap cool morning dew inside the canopy",
            "Eliminate volunteer wheat plants during the summer fallow period",
            "Monitor regional rust spore trap tracking reports"
        ]
    },
    "Wheat___healthy": {
        "plant": "Wheat",
        "disease": "Healthy Leaf",
        "scientificName": "Triticum aestivum",
        "status": "Healthy",
        "severity": "None",
        "symptoms": [
            "Erect, slender bluish-green to deep green blades with smooth margins",
            "Vigorous flag leaf development without rust pustules, powdery mildew, or Septoria spots",
            "Sturdy culms and healthy developing spike heads"
        ],
        "causes": [
            "Proper drill planting depth into moisture-retentive, well-prepared soil",
            "Balanced nitrogen and phosphorus starter fertilization",
            "Favorable weather conditions without prolonged leaf wetness"
        ],
        "treatment": [
            "No chemical intervention needed",
            "Ensure adequate micronutrient availability (sulfur, zinc) during stem elongation"
        ],
        "prevention": [
            "Scout canopy weekly through heading and flowering stages",
            "Check for Fusarium head blight risk during flowering if rain occurs",
            "Practice minimum 2-year crop rotation with oilseeds (canola) or pulse crops"
        ]
    },

    # ------------------ COTTON ------------------
    "Cotton___Bacterial_blight": {
        "plant": "Cotton",
        "disease": "Bacterial Blight (Angular Leaf Spot)",
        "scientificName": "Xanthomonas citri subsp. malvacearum",
        "status": "Diseased",
        "severity": "Moderate to High",
        "symptoms": [
            "Water-soaked angular spots bounded strictly by small leaf veinlets",
            "Lesions turn reddish-brown to dark black with greasy undersides",
            "'Blackarm' phase: black girdling lesions on branches and main stem causing limb breakage",
            "Boll rot lesions causing discolored lint and seed rot"
        ],
        "causes": [
            "Xanthomonas citri subsp. malvacearum bacteria",
            "Wind-driven rain, sand abrasion, and warm humid weather (above 25°C)",
            "Infected seed cotton or trash from previous harvests left on soil surface",
            "High-pressure overhead sprinkler irrigation hitting sensitive leaf surfaces"
        ],
        "treatment": [
            "Apply copper bactericide sprays at early seedling stages if infections are detected",
            "Avoid cultivating or operating machinery through cotton fields while plants are wet",
            "Shred and deeply incorporate cotton stalks into soil immediately following harvest",
            "Apply defoliants carefully to prevent prolonged leaf trash retention during stripping"
        ],
        "prevention": [
            "Plant certified acid-delinted cotton seeds treated with recommended bactericides",
            "Select transgenic or conventional cotton cultivars with genetic blight resistance (B-genes)",
            "Adopt crop rotation with non-host crops like corn, sorghum, or peanuts for 2 seasons",
            "Utilize furrow or drip irrigation to keep leaf canopies dry"
        ]
    },
    "Cotton___healthy": {
        "plant": "Cotton",
        "disease": "Healthy Leaf",
        "scientificName": "Gossypium hirsutum",
        "status": "Healthy",
        "severity": "None",
        "symptoms": [
            "Broad palmately lobed rich green leaves with prominent pale veins and glossy sheen",
            "Sturdy mainstem with healthy vegetative and fruiting sympodial branches",
            "Clean square buds and robust developing green bolls"
        ],
        "causes": [
            "Warm sunny climate (28°C–35°C) with deep, well-aerated soil",
            "Balanced nitrogen management avoiding rank, overgrown vegetative growth",
            "Timely application of plant growth regulators (mepiquat chloride) to balance canopy"
        ],
        "treatment": [
            "No disease control measures necessary",
            "Continue standard monitoring for bollworms, whiteflies, and lygus bugs"
        ],
        "prevention": [
            "Scout terminal buds and squares twice weekly during peak fruiting",
            "Maintain clean field borders to reduce pest migration",
            "Ensure uniform soil moisture through flowering to prevent boll shedding"
        ]
    }
}

# Fallback profile for uncertain or generic leaf
UNCERTAIN_LEAF_PROFILE: Dict[str, Any] = {
    "plant": "Plant / Crop",
    "disease": "Inconclusive / Low Confidence",
    "scientificName": "Indeterminate Specimen",
    "status": "Uncertain",
    "severity": "Low",
    "symptoms": [
        "Image quality, lighting, or leaf angle is insufficient for definitive identification",
        "Visual symptoms do not match our verified agricultural disease database",
        "Possible overlapping environmental stress (drought, sunscald, or nutrient deficiency)"
    ],
    "causes": [
        "Blurry photo, distant framing, or multiple overlapping non-leaf objects",
        "Non-standard lighting conditions or extreme reflection glare on foliage",
        "Early stage infection where definitive morphological patterns have not fully developed"
    ],
    "treatment": [
        "Capture a new, sharp, well-lit close-up photograph of an individual affected leaf",
        "Ensure the leaf is flat and fills at least 70% of the camera frame",
        "Consult your local agricultural extension agent or certified agronomist for physical testing"
    ],
    "prevention": [
        "Photograph leaves in natural indirect daylight without harsh shadow cast",
        "Take photos of both upper and lower leaf surfaces for accurate symptom tracking",
        "Isolate suspicious plants until diagnostic verification is complete"
    ]
}

def get_disease_info(key: str) -> Optional[Dict[str, Any]]:
    """Retrieve disease metadata by key, or return fallback."""
    if key in DISEASE_DATABASE:
        return DISEASE_DATABASE[key]
    # Check case-insensitive match
    for k, v in DISEASE_DATABASE.items():
        if k.lower() == key.lower():
            return v
    return None
