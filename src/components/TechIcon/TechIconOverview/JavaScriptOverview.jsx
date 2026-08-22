export const javaScriptOverview = {
    whatIsIt: 'JavaScript হলো একটি high-level, interpreted/JIT-compiled, dynamically typed programming language। এটি ব্রাউজারে Interactive web application তৈরি, Frontend, Backend (Node.js), Mobile/Desktop application এবং API development এ ব্যাপকভাবে ব্যবহৃত হয়।',
    whyUseIt: 'এটি ক্লায়েন্ট-সাইড ডাইনামিক ইন্টারঅ্যাকশন এবং সার্ভার-সাইড রানটাইম উভয় ক্ষেত্রে একক ভাষা হিসেবে কাজ করে, যা এন্ড-টু-এন্ড ওয়েব ডেভেলপমেন্টকে অত্যন্ত দ্রুত, আধুনিক ও নমনীয় করে তোলে।',
    keyConcepts: [
        'Scope, Hoisting & TDZ',
        'Execution Context & Call Stack',
        'Closures & Data Privacy',
        'Prototypes & Prototype Chain',
        'Event Loop, Promises & Async/Await',
        'this Keyword & Arrow Functions',
        'Higher-Order Functions & Currying',
        'Event Bubbling & Delegation'
    ],
    vivaQuestions: [
        {
            q: '1. JavaScript কী?',
            a: 'JavaScript হলো একটি high-level, interpreted/JIT-compiled, dynamically typed programming language। এটি মূলত Interactive web application তৈরিতে, Frontend, Backend (Node.js), Mobile/Desktop app, API development এবং Server-side programming-এ ব্যবহার করা হয়।'
        },
        {
            q: '2. var, let, এবং const এর মধ্যে পার্থক্য কী?',
            a: 'var: Function scoped, redeclare ও reassign করা যায়, hoisting হয় এবং initial value undefined। let: Block scoped, redeclare করা যায় না, reassign করা যায়। const: Block scoped, redeclare ও reassign করা যায় না (তবে object বা array-এর ভিতরের value পরিবর্তন করা যায়)।'
        },
        {
            q: '3. Hoisting কী?',
            a: 'JavaScript execution-এর আগে variable ও function declaration-গুলো memory-তে register হওয়ার behavior-কে hoisting বলা হয়।'
        },
        {
            q: '4. let এবং const hoist হয় কি?',
            a: 'হ্যাঁ, hoist হয়। কিন্তু initialization-এর আগে access করা যায় না, করলে ReferenceError দেয়।'
        },
        {
            q: '5. Temporal Dead Zone (TDZ) কী?',
            a: 'let এবং const declaration হওয়ার আগে variable access করা যায় না। এই declaration-এর আগের সময়টাকে Temporal Dead Zone (TDZ) বলা হয়।'
        },
        {
            q: '6. Function Scope এবং Block Scope কী?',
            a: 'Function Scope: var এর মতো Variable শুধু নির্দিষ্ট function এর ভেতরে প্রবেশযোগ্য। Block Scope: let ও const এর মতো Variable শুধু নির্দিষ্ট { } block এর ভেতরে প্রবেশযোগ্য।'
        },
        {
            q: '7. Execution Context কী?',
            a: 'JavaScript code execute করার environment-কে Execution Context বলা হয় (Global & Function EC)। এর প্রধান দুটি অংশ: Memory Creation Phase এবং Code Execution Phase।'
        },
        {
            q: '8. Call Stack কী?',
            a: 'JavaScript কোন function কখন execute করবে তা LIFO (Last In First Out) নিয়মে track করার জন্য Call Stack ব্যবহার করে।'
        },
        {
            q: '9. JavaScript কি Single-threaded?',
            a: 'হ্যাঁ, JavaScript-এর main execution thread single-threaded। তবে Web APIs, Event Loop এবং Task Queue-এর মাধ্যমে asynchronous কাজ handle করা যায়।'
        },
        {
            q: '10. JavaScript-এ this কী?',
            a: 'this সাধারণত function কীভাবে call করা হয়েছে তার lexical বা execution context এর ওপর নির্ভর করে current object কে refer করে।'
        },
        {
            q: '11. Arrow Function-এ this কিভাবে কাজ করে?',
            a: 'Arrow function নিজের this তৈরি করে না, এটি lexical scope থেকে outer environment এর this গ্রহণ করে।'
        },
        {
            q: '12. Regular Function এবং Arrow Function-এর পার্থক্য কী?',
            a: 'Regular function-এর নিজের this, arguments object, constructor capability (new keyword) এবং prototype থাকে। Arrow function-এ এইগুলো থাকে না এবং এটি lexical this ব্যবহার করে।'
        },
        {
            q: '13. Closure কী?',
            a: 'Closure হলো এমন একটি function যা তার outer scope-এর variables মনে রাখতে পারে, এমনকি outer function execution শেষ হয়ে গেলেও।'
        },
        {
            q: '14. Closure কোথায় ব্যবহার হয়?',
            a: 'Data privacy, Counters, Memoization, Event handlers, Module pattern, এবং Factory functions-এ ব্যবহার হয়।'
        },
        {
            q: '15. Closure কি Memory Leak করতে পারে?',
            a: 'হ্যাঁ, যদি unnecessary reference closure-এর মাধ্যমে দীর্ঘ সময় memory-তে থেকে যায় এবং garbage collect না হয়, তবে memory leak হতে পারে।'
        },
        {
            q: '16. Prototype কী?',
            a: 'JavaScript prototype-based inheritance ব্যবহার করে। একটি object অন্য object থেকে properties & methods inherit করতে পারে।'
        },
        {
            q: '17. Prototype Chain কী?',
            a: 'যখন কোনো property current object-এ পাওয়া যায় না, তখন prototype chain ধরে উপরে Object.prototype হয়ে null পর্যন্ত খুঁজে দেখা হয়।'
        },
        {
            q: '18. __proto__ এবং prototype এর পার্থক্য কী?',
            a: 'prototype হলো Function-এর property, আর __proto__ হলো যেকোনো Object-এর internal prototype reference।'
        },
        {
            q: '19. Constructor Function কী?',
            a: 'নতুন object তৈরি ও initialize করতে new keyword দিয়ে call করা বিশেষ function-কে Constructor Function বলা হয়।'
        },
        {
            q: '20. new keyword কী করে?',
            a: 'নতুন object তৈরি করে, this কে নতুন object-এ refer করায়, prototype link তৈরি করে এবং তৈরি হওয়া object return করে।'
        },
        {
            q: '21. JavaScript Class কি আসল Class?',
            a: 'না, JavaScript মূলত prototype-based। Class হলো prototype-based inheritance-এর উপর syntactic sugar বা cleaner syntax।'
        },
        {
            q: '22. extends কী?',
            a: 'একটি class অন্য parent class থেকে inherit করতে `extends` ব্যবহৃত হয়।'
        },
        {
            q: '23. super() কী?',
            a: 'Parent class-এর constructor call করতে child class-এর ভেতরে `super()` ব্যবহার করা হয়।'
        },
        {
            q: '24. Synchronous এবং Asynchronous JavaScript কী?',
            a: 'Synchronous: একটি কাজ শেষ হওয়ার পর পরের কাজ শুরু হয় (blocking)। Asynchronous: কাজগুলো background environment-এ সম্পন্ন হতে পারে (non-blocking)।'
        },
        {
            q: '25. Callback কী?',
            a: 'একটি function অন্য function-এর argument হিসেবে pass করলে তাকে callback বলা হয়।'
        },
        {
            q: '26. Callback Hell কী?',
            a: 'অনেকগুলো deeply nested callback দিয়ে কোড জটিল ও পড়া কঠিন হয়ে পড়লে তাকে Callback Hell বলা হয়।'
        },
        {
            q: '27. Promise কী?',
            a: 'Promise হলো asynchronous operation-এর future result represent করার অবজেক্ট। এর ৩টি state: Pending, Fulfilled, Rejected।'
        },
        {
            q: '28. .then(), .catch() এবং .finally() কী?',
            a: '.then() সফল ফলাফল (success) প্রসেস করে, .catch() এরর (error) হ্যান্ডেল করে, এবং .finally() সব ক্ষেত্রেই শেষে রান হয়।'
        },
        {
            q: '29. async/await কী?',
            a: 'Promises হ্যান্ডেল করার cleaner এবং synchronous-looking syntax।'
        },
        {
            q: '30. async function সবসময় কী return করে?',
            a: 'async function সবসময় একটি Promise রিটার্ন করে।'
        },
        {
            q: '31. await কোথায় ব্যবহার করা যায়?',
            a: 'async function এর ভেতরে এবং ES modules এর top-level এ ব্যবহার করা যায়।'
        },
        {
            q: '32. Event Loop কী?',
            a: 'JavaScript-এর asynchronous tasks (Call Stack, Web APIs, Task Queue, Microtask Queue) সমন্বয় ও হ্যান্ডেল করার মূল মেকানিজম।'
        },
        {
            q: '33. Microtask এবং Macrotask এর পার্থক্য কী?',
            a: 'Microtask (Promise.then, queueMicrotask) prioritized হয়ে আগে রান হয়। Macrotask (setTimeout, setInterval) Microtask কিউ খালি হওয়ার পর রান হয়।'
        },
        {
            q: '34. [Code Output]: 1, setTimeout(0), Promise, 4 এর আউটপুট কী?',
            a: 'Output হবে: 1, 4, 3, 2। কারণ synchronous code আগে চলে, তারপর Microtask (Promise), সবশেষে Macrotask (setTimeout)।'
        },
        {
            q: '35. setTimeout(fn, 0) কি immediately execute হয়?',
            a: 'না, এটি task queue-তে schedule হয়। Call Stack ও microtasks খালি হওয়ার পর execute হয়।'
        },
        {
            q: '36. Shallow Copy এবং Deep Copy কী?',
            a: 'Shallow Copy: Top-level properties কপি করে কিন্তু nested object এর reference একই থাকে। Deep Copy: সম্পূর্ণ স্বাধীনভাবে nested object সহ সব ভ্যালু কপি করে (যেমন: structuredClone)।'
        },
        {
            q: '37. Spread Operator (...) কী?',
            a: 'Array বা Object-এর উপাদানগুলোকে প্রসারিত বা ক্লোন/মার্জ করতে ব্যবহার করা হয়।'
        },
        {
            q: '38. Rest Operator (...) কী?',
            a: 'Function parameter-এ অবশিষ্ট argument গুলোকে একত্রিত করে একটি Array তৈরি করে।'
        },
        {
            q: '39. Optional Chaining (?.) কী?',
            a: 'Object property null বা undefined হলেও error না দিয়ে স্রেফ undefined রিটার্ন করে safe access প্রদান করে।'
        },
        {
            q: '40. Nullish Coalescing Operator (??) কী?',
            a: 'শুধুমাত্র null অথবা undefined হলেই ডানপাশের default value রিটার্ন করে।'
        },
        {
            q: '41. || এবং ?? এর পার্থক্য কী?',
            a: '|| যেকোনো falsy value (0, "", false, null, undefined) চেক করে। ?? শুধুমাত্র null এবং undefined চেক করে।'
        },
        {
            q: '42. map() এবং forEach() এর পার্থক্য কী?',
            a: 'map() নতুন একটি array রিটার্ন করে। forEach() কোনো মান রিটার্ন করে না (undefined)।'
        },
        {
            q: '43. filter() কী?',
            a: 'শর্ত পূরণকারী উপাদানগুলো দিয়ে একটি নতুন array তৈরি করে রিটার্ন করে।'
        },
        {
            q: '44. reduce() কী?',
            a: 'Array এর সব উপাদানকে প্রসেস করে একটি একক ফলাফলে (accumulator) রূপান্তর করে।'
        },
        {
            q: '45. find() এবং filter() এর পার্থক্য কী?',
            a: 'find() প্রথম ম্যাচিং উপাদানটি রিটার্ন করে, আর filter() সব ম্যাচিং উপাদান নিয়ে একটি নতুন array দেয়।'
        },
        {
            q: '46. some() এবং every() কী?',
            a: 'some(): অন্তত একটি উপাদান শর্ত মানলে true। every(): সকল উপাদান শর্ত মানলে true।'
        },
        {
            q: '47. == এবং === এর পার্থক্য কী?',
            a: '== টাইপ কনভার্সন (coercion) করে মান তুলনা করে। === মান ও টাইপ উভয়ই পরীক্ষা করে (strict equality)।'
        },
        {
            q: '48. Object.is() কী?',
            a: 'Strict equality পরীক্ষা করার বিল্ট-ইন মেথড, যা NaN === NaN (true) ও +0 === -0 (false) হ্যান্ডেল করতে পারে।'
        },
        {
            q: '49. JavaScript-এর Primitive Data Types কী কী?',
            a: 'string, number, bigint, boolean, undefined, symbol, null (মোট ৭টি)।'
        },
        {
            q: '50. typeof null কেন "object"?',
            a: 'এটি JavaScript এর আদিম লেগাসি বাগ/বিহেভিয়ার (historical bug), যেখানে null এর টাইপ ট্যাগ ০ (object) হিসেবে সেট হয়ে গিয়েছিল।'
        },
        {
            q: '51. NaN কী?',
            a: 'NaN মানে Not-a-Number, যা অবৈধ গাণিতিক অপারেশনের ফলাফল প্রকাশ করে (Number.isNaN দ্বারা চেক করতে হয়)।'
        },
        {
            q: '52. undefined এবং null এর পার্থক্য কী?',
            a: 'undefined: ভ্যারিয়েবল ডিক্লেয়ার করা হয়েছে কিন্তু মান দেওয়া হয়নি। null: ডেভেলপার ইচ্ছা করে খালি বা অনুপস্থিত মান বোঝাতে সেট করেছে।'
        },
        {
            q: '53. Type Coercion কী?',
            a: 'JavaScript স্বয়ংক্রিয়ভাবে এক টাইপ থেকে অন্য টাইপে ডেটা কনভার্ট করে ফেলে (যেমন "5" + 2 = "52")।'
        },
        {
            q: '54. Explicit এবং Implicit Type Conversion কী?',
            a: 'Explicit: ডেভেলপার ম্যানুয়ালি কনভার্ট করে (যেমন Number("10"))। Implicit: JS ইঞ্জিন নিজে থেকেই কনভার্ট করে (যেমন "10" * 2 = 20)।'
        },
        {
            q: '55. Garbage Collection কী?',
            a: 'যেসব Object আর প্রোগ্রাম থেকে পৌঁছানো (reachable) যায় না, JS ইঞ্জিন সেগুলোর মেমোরি স্বয়ংক্রিয়ভাবে খালি করে দেয়।'
        },
        {
            q: '56. Memory Leak কী?',
            a: 'অপ্রয়োজনীয় ডেটা মেমোরিতে থেকে যাওয়ার ফলে গার্বেজ কালেক্টর তা মুক্ত করতে পারে না এবং মেমোরি অপচয় হয়।'
        },
        {
            q: '57. First-Class Function কী?',
            a: 'JavaScript-এ ফাংশনকে ভ্যারিয়েবলে রাখা যায়, আর্গুমেন্ট হিসেবে পাস করা যায় এবং অন্য ফাংশন থেকে রিটার্ন করা যায়।'
        },
        {
            q: '58. Higher-Order Function কী?',
            a: 'যে ফাংশন অন্য ফাংশনকে আর্গুমেন্ট হিসেবে গ্রহণ করে অথবা অন্য ফাংশন রিটার্ন করে।'
        },
        {
            q: '59. Pure Function কী?',
            a: 'একই ইনপুট দিলে সবসময় একই আউটপুট দেয় এবং বাইরে কোনো সাইড ইফেক্ট (state modification) ফেলে না।'
        },
        {
            q: '60. IIFE কী?',
            a: 'Immediately Invoked Function Expression - যা তৈরি হওয়ার সাথে সাথেই নিজে নিজে কল হয়ে যায়।'
        },
        {
            q: '61. call() কী?',
            a: 'ফাংশনকে তাৎক্ষণিক কল করে এবং প্রথম আর্গুমেন্টে this ম্যানুয়ালি সেট করার সুবিধা দেয়।'
        },
        {
            q: '62. apply() কী?',
            a: 'call() এর মতোই, তবে আর্গুমেন্টগুলো আলাদা আলাদা না দিয়ে array আকারে পাস করতে হয়।'
        },
        {
            q: '63. bind() কী?',
            a: 'ফাংশন সাথে সাথে রান করে না, বরং this বাউন্ড করা একটি নতুন ফাংশন রিটার্ন করে যা পরে কল করা যায়।'
        },
        {
            q: '64. call, apply, bind এর পার্থক্য কী?',
            a: 'call: সাথে সাথে রান হয় (Comma separated args)। apply: সাথে সাথে রান হয় (Array args)। bind: পরে রান করার জন্য নতুন ফাংশন দেয়।'
        },
        {
            q: '65. Currying কী?',
            a: 'একাধিক আর্গুমেন্টের ফাংশনকে একটি করে আর্গুমেন্ট নেওয়া পরপর বেশ কয়েকটি ফাংশনের সিরিজে রূপান্তর করা।'
        },
        {
            q: '66. Memoization কী?',
            a: 'ফাংশনের আগের হিসাবের ফলাফল ক্যাশে (cache) জমা রাখা যাতে একই ইনপুটে পুনরায় হিসাব করতে না হয়।'
        },
        {
            q: '67. Debouncing কী?',
            a: 'বারবার ইভেন্ট ট্রিগার হলেও ব্যবহারকারীর থামা পর্যন্ত একটি নির্দিষ্ট সময় অপেক্ষা করে একবার ফাংশন এক্সিকিউট করা (যেমন Search Input)।'
        },
        {
            q: '68. Throttling কী?',
            a: 'একটি নির্দিষ্ট সময় পরপর ফাংশন কল সীমাবদ্ধ (limit execution rate) করা (যেমন Scroll/Resize event)।'
        },
        {
            q: '69. Debounce এবং Throttle-এর পার্থক্য কী?',
            a: 'Debounce: ইভেন্ট থামার পর রান হয়। Throttle: ইভেন্ট চলাকালে নির্দিষ্ট বিরতি পর পর রান হয়।'
        },
        {
            q: '70. ES Module কী?',
            a: 'export এবং import ব্যবহারের মাধ্যমে JavaScript কোডকে একাধিক ফাইলেই ভাগ করার আধুনিক স্ট্যান্ডার্ড সিস্টেম।'
        },
        {
            q: '71. Named Export এবং Default Export কী?',
            a: 'Named Export: নির্দিষ্ট নামে এক্সপোর্ট/ইমপোর্ট করতে হয়। Default Export: ফাইল প্রতি একটি প্রধান এক্সপোর্ট থাকে যা যেকোন নামে ইমপোর্ট করা যায়।'
        },
        {
            q: '72. Dynamic Import কী?',
            a: 'import() ব্যবহার করে প্রয়োজনে অন-ডিমান্ড বা রানটাইমে মডিউল লোড করা (Code splitting)।'
        },
        {
            q: '73. Object Destructuring কী?',
            a: 'Object থেকে সহজেই প্রপার্টিগুলো আলাদা ভ্যারিয়েবলে এক্সট্র্যাক্ট করে নেওয়ার উপায়।'
        },
        {
            q: '74. Array Destructuring কী?',
            a: 'Array এর উপাদানগুলোকে পজিশন অনুযায়ী আলাদা ভ্যারিয়েবলে অ্যাসাইন করার উপায়।'
        },
        {
            q: '75. try, catch, finally কী?',
            a: 'try কোড ব্লক চালায়, এরর হলে catch হ্যান্ডেল করে, এবং finally সবসময় শেষে এক্সিকিউট হয়।'
        },
        {
            q: '76. throw কী?',
            a: 'কাস্টম এরর ম্যানুয়ালি তৈরি ও নিক্ষেপ করতে ব্যবহার করা হয়।'
        },
        {
            q: '77. Custom Error Class কীভাবে তৈরি করবেন?',
            a: 'class CustomError extends Error তৈরি করে super(message) এর মাধ্যমে তৈরি করা হয়।'
        },
        {
            q: '78. Object.freeze() কী?',
            a: 'Object কে সম্পূর্ণ ইমিউটেবল করে ফেলে — নতুন প্রপার্টি অ্যাড, ডিলিট বা মডিফাই করা যায় না।'
        },
        {
            q: '79. Object.seal() কী?',
            a: 'নতুন প্রপার্টি অ্যাড/ডিলিট করা যায় না, তবে বিদ্যমান প্রপার্টির মান পরিবর্তন করা যায়।'
        },
        {
            q: '80. Object.preventExtensions() কী?',
            a: 'Object-এ নতুন প্রপার্টি যোগ করা বন্ধ করে।'
        },
        {
            q: '81. Symbol কী?',
            a: 'একটি অননুকরণীয় এবং ইউনিক (unique) প্রিমিটিভ ডেটা টাইপ।'
        },
        {
            q: '82. Symbol কোথায় ব্যবহার হয়?',
            a: 'Object এর প্রাইভেট/ইউনিক প্রপার্টি কি এবং বিল্ট-ইন প্রোটোকল কাস্টমাইজেশনে।'
        },
        {
            q: '83. Event Delegation কী?',
            a: 'Child উপাদানগুলোর জন্য আলাদা ইভেন্ট না বসিয়ে Parent উপাদানে একটি ইভেন্ট লিসেনার দিয়ে হ্যান্ডেল করা।'
        },
        {
            q: '84. Event Bubbling কী?',
            a: 'Event সবচেয়ে ভেতরের (child) উপাদান থেকে বাইরের (parent/document) দিকে ছড়িয়ে পড়া।'
        },
        {
            q: '85. Event Capturing কী?',
            a: 'Event একদম বাইরের (window) দিক থেকে ভেতরের (target element) দিকে আসার ফেস।'
        },
        {
            q: '86. stopPropagation() কী?',
            a: 'Event এর প্রোপাগেশন (Bubbling/Capturing) বন্ধ করে।'
        },
        {
            q: '87. preventDefault() কী?',
            a: 'ব্রাউজারের ডিফল্ট আচরণ (যেমন form submit এ রিলোড হওয়া) বন্ধ করে।'
        },
        {
            q: '88. Generator Function কী?',
            a: 'function* দিয়ে তৈরি ফাংশন যা yield দিয়ে এক্সিকিউশন পজ ও রেজুম করতে পারে।'
        },
        {
            q: '89. yield কী?',
            a: 'Generator এর এক্সিকিউশন সাময়িকভাবে থামিয়ে মান ফেরত পাঠায়।'
        },
        {
            q: '90. Iterator কী?',
            a: 'পর পর উপাদানগুলো এক এক করে access করার জন্য next() মেথড সম্বলিত অবজেক্ট।'
        },
        {
            q: '91. Iterable কী?',
            a: 'যে সকল অবজেক্ট Symbol.iterator ইমপ্লিমেন্ট করে (যেমন Array, Map, Set)।'
        },
        {
            q: '92. Map এবং Object-এর পার্থক্য কী?',
            a: 'Map-এ যেকোনো টাইপ Key হতে পারে এবং এর কীগুলোর অর্ডার বজায় থাকে। Object এ কি শুধুমাত্র String/Symbol হয়।'
        },
        {
            q: '93. Set কী?',
            a: 'শুধুমাত্র অনন্য (Unique) ভ্যালুর সংগ্রহ।'
        },
        {
            q: '94. localStorage এবং sessionStorage এর পার্থক্য কী?',
            a: 'localStorage: ব্রাউজার বন্ধ করলেও ডেটা থেকে যায়। sessionStorage: কারেন্ট ট্যাব বা সেশন বন্ধ হলেই মুছে যায়।'
        },
        {
            q: '95. Cookies এবং localStorage-এর পার্থক্য কী?',
            a: 'Cookies: প্রতি সার্ভার রিকোয়েস্টে পাঠায় (সেশন/অথেনটিকেশন)। localStorage: শুধুমাত্র ক্লায়েন্ট সাইডে বড় সাইজের ডেটা রাখে।'
        },
        {
            q: '96. Promise.all() কী?',
            a: 'সকল প্রমিজ সফল হলে ফলাফল দেয়, একটাও রিজেক্ট হলে পুরোটা রিজেক্ট হয়ে যায়।'
        },
        {
            q: '97. Promise.allSettled() কী?',
            a: 'সকল প্রমিজ সফল বা ব্যর্থ যা-ই হোক, সবগুলো সেটল হওয়ার পর স্ট্যাটাস সহ রেজাল্ট দেয়।'
        },
        {
            q: '98. Promise.race() কী?',
            a: 'যে প্রমিজটি সবার আগে সেটল (পাস বা ফেল) হবে তার রেজাল্ট দেয়।'
        },
        {
            q: '99. Promise.any() কী?',
            a: 'প্রথম সফল (fulfilled) প্রমিজটি রিটার্ন করে। সব ব্যর্থ হলে AggregateError দেয়।'
        },
        {
            q: '100. typeof [] এবং typeof {} এর আউটপুট কী?',
            a: 'উভয়ের আউটপুটই "object"। Array শনাক্ত করতে Array.isArray([]) ব্যবহার করা উচিত।'
        },
        {
            q: '101. [] == false এর আউটপুট কী?',
            a: 'true, কারণ loose equality টাইপ কোয়ের্সন করে ফাঁকা অ্যারেকে 0 এবং false কে 0 বানিয়ে ফেলে।'
        },
        {
            q: '102. "5" + 2 এর আউটপুট কী?',
            a: '"52" (String concatenation)।'
        },
        {
            q: '103. "5" - 2 এর আউটপুট কী?',
            a: '3 (Implicit number conversion)।'
        },
        {
            q: '104. NaN === NaN এর আউটপুট কী?',
            a: 'false। NaN নিজের সাথেও সমতুল্য নয়।'
        },
        {
            q: '105. const copy = user; copy.name = "David"; console.log(user.name) এর আউটপুট কী?',
            a: '"David", কারণ Object Memory Reference অনুযায়ী কপি হয়।'
        },
        {
            q: '106. Lexical Scope কী?',
            a: 'ফাংশনটি যেখানে সংজ্ঞায়িত করা হয়েছে সেই স্কোপের ভ্যারিয়েবল এক্সেস করতে পারার মেকানিজম।'
        },
        {
            q: '107. Lexical Environment কী?',
            a: 'স্কোপের ভ্যারিয়েবল এবং আউটার এনভারনমেন্টের রেফারেন্স নিয়ে গঠিত ইন্টারনাল এনভারনমেন্ট।'
        },
        {
            q: '108. Strict Mode ("use strict") কী?',
            a: 'কোডের সাইলেন্ট বা ক্ষতিকর ভুলগুলোকে দৃশ্যমান এরর হিসেবে রূপান্তর করে নিরাপদ কোড লিখতে সাহায্য করে।'
        },
        {
            q: '109. arguments object কী?',
            a: 'Regular function-এ পাস করা সকল আর্গুমেন্টের অ্যারে-লাইক অবজেক্ট (Arrow function-এ নেই)।'
        },
        {
            q: '110. Function Declaration এবং Function Expression-এর পার্থক্য কী?',
            a: 'Declaration ডিক্লেয়ার করার আগেই ফাংশন হওয়াই হোয়েস্টেড হয়, কিন্তু Expression ভ্যারিয়েবল অ্যাসাইনমেন্টের নিয়ম মেনে চলে।'
        },
        {
            q: '111. Anonymous Function কী?',
            a: 'নামবিহীন ফাংশন যা সাধারণত ক্যাচ বা কলব্যাকে ব্যবহৃত হয়।'
        },
        {
            q: '112. IIFE কেন ব্যবহার করা হতো?',
            a: 'গ্লোবাল স্কোপ দূষিত হওয়া থেকে রক্ষা করতে প্রাইভেট স্কোপ তৈরির জন্য।'
        },
        {
            q: '113. JavaScript কি pass by reference?',
            a: 'না, JS আসলে pass-by-value। Object-এর ক্ষেত্রে ভ্যালু হিসেবে reference-এর কপি পাস হয়।'
        },
        {
            q: '114. Mutable এবং Immutable কী?',
            a: 'Mutable: মূল ভ্যালু পরিবর্তন করা যায়। Immutable: মূল ভ্যালু অপরিবর্তনীয় রেখে নতুন ভ্যালু তৈরি করতে হয়।'
        },
        {
            q: '115. delete operator কী?',
            a: 'Object থেকে নির্দিষ্ট প্রপার্টি মুছে ফেলে।'
        },
        {
            q: '116. in operator কী?',
            a: 'Object বা তার প্রোটোটাইপ চেইনে প্রপার্টি আছে কিনা চেক করে true/false দেয়।'
        },
        {
            q: '117. hasOwnProperty() বা Object.hasOwn() কী?',
            a: 'Object-এর নিজস্ব (non-inherited) প্রপার্টি আছে কিনা চেক করে।'
        },
        {
            q: '118. WeakMap কী?',
            a: 'যেখানে Key সবসময় Object হতে হয় এবং Garbage Collection সাপেক্ষে মেমোরি মুক্ত করতে পারে।'
        },
        {
            q: '119. WeakSet কী?',
            a: 'যেখানে শুধুমাত্র Object রাখা যায় এবং Iterable নয়।'
        },
        {
            q: '120. JavaScript Engine কী?',
            a: 'JavaScript কোডকে পার্স ও এক্সিকিউট করার সফটওয়্যার ইঞ্জিন (যেমন Chrome V8, SpiderMonkey)।'
        }
    ]
};

export default javaScriptOverview;
