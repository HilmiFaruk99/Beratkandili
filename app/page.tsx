"use client";

import { useEffect, useState, useRef } from "react";
import "./page.css";

// Yâsîn Sûresi in 6 pages - vollständig mit allen 83 Versen
const YASIN_PAGES = [
  // Page 1: Verses 1-12 - Einleitung und Bezeugung des Propheten
  `بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحٖيمِ

يسٓ ﴿١﴾ وَٱلْقُرْآنِ ٱلْحَكِيمِ ﴿٢﴾ إِنَّكَ لَمِنَ ٱلْمُرْسَلِينَ ﴿٣﴾ عَلَىٰ صِرَٰطٍۢ مُّسْتَقِيمٍۢ ﴿٤﴾ تَنزِيلَ ٱلْعَزِيزِ ٱلرَّحِيمِ ﴿٥﴾ لِتُنذِرَ قَوْمًا مَّآ أُنذِرَ آبَاؤُهُمْ فَهُمْ غَافِلُونَ ﴿٦﴾ لَقَدْ حَقَّ ٱلْقَوْلُ عَلَىٰ أَكْثَرِهِمْ فَهُمْ لَا يُؤْمِنُونَ ﴿٧﴾ إِنَّا جَعَلْنَا فِي أَعْنَاقِهِمْ أَغْلَالًا فَهِيَ إِلَىٰ ٱلْأَذْقَانِ فَهُم مُّقْمَحُونَ ﴿٨﴾ وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا وَمِنْ خَلْفِهِمْ سَدًّا فَأَغْشَيْنَاهُمْ فَهُمْ لَا يُبْصِرُونَ ﴿٩﴾ وَسَوَاءٌ عَلَيْهِمْ أَءَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ ﴿١٠﴾ إِنَّمَا تُنذِرُ مَن ٱتَّبَعَ ٱلذِّكْرَ وَخَشِيَ ٱلرَّحْمَٰنَ بِٱلْغَيْبِ فَبَشِّرْهُ بِمَغْفِرَةٍۢ وَأَجْرٍۢ كَرِيمٍۢ ﴿١١﴾ إِنَّا نَحْنُ نُحْيِي ٱلْمَوْتَىٰ وَنَكْتُبُ مَا قَدَّمُوا وَآثَارَهُمْ وَكُلَّ شَيْءٍۢ أَحْصَيْنَاهُ فِي إِمَامٍۢ مُّبِينٍۢ ﴿١٢﴾`,

  // Page 2: Verses 13-32 - Das Gleichnis der Bewohner des Dorfes
  `وَٱضْرِبْ لَهُم مَّثَلًا أَصْحَٰبَ ٱلْقَرْيَةِ إِذْ جَاءَتْهَا ٱلْمُرْسَلُونَ ﴿١٣﴾ إِذْ أَرْسَلْنَآ إِلَيْهِمُ ٱثْنَيْنِ فَكَذَّبُوهُمَا فَعَزَّزْنَا بِثَالِثٍۢ فَقَالُوا إِنَّآ إِلَيْكُم مُّرْسَلُونَ ﴿١٤﴾ قَالُوا مَآ أَنتُمْ إِلَّا بَشَرٌۢ مِّثْلُنَا وَمَآ أَنزَلَ ٱلرَّحْمَٰنُ مِن شَيْءٍۢ إِن أَنتُمْ إِلَّا تَكْذِبُونَ ﴿١٥﴾ قَالُوا رَبُّنَا يَعْلَمُ إِنَّآ إِلَيْكُمْ لَمُرْسَلُونَ ﴿١٦﴾ وَمَا عَلَيْنَآ إِلَّا ٱلْبَلَاغُ ٱلْمُبِينُ ﴿١٧﴾ قَالُوا إِنَّا تَطَيَّرْنَا بِكُمْ لَئِن لَّمْ تَنتَهُوا لَنَرْجِمَنَّكُمْ وَلَيَمَسَّنَّكُم مِّنَّا عَذَابٌ أَلِيمٌۢ ﴿١٨﴾ قَالُوا طَائِرُكُم مَّعَكُمْ أَإِن ذُكِّرْتُمْ بَلْ أَنتُمْ قَوْمٌ مُّسْرِفُونَ ﴿١٩﴾ وَجَاءَ مِنْ أَقْصَى ٱلْمَدِينَةِ رَجُلٌۢ يَسْعَىٰ قَالَ يَٰقَوْمِ ٱتَّبِعُوا ٱلْمُرْسَلِينَ ﴿٢٠﴾ ٱتَّبِعُوا مَن لَّا يَسْأَلُكُمْ أَجْرًا وَهُم مُّهْتَدُونَ ﴿٢١﴾ وَمَا لِيَ لَآ أَعْبُدُ ٱلَّذِي فَطَرَنِي وَإِلَيْهِ تُرْجَعُونَ ﴿٢٢﴾ أَأَتَّخِذُ مِن دُونِهِ آلِهَةً إِن يُرِدْنِ ٱلرَّحْمَٰنُ بِضُرٍّۢ لَّا تُغْنِ عَنِّي شَفَاعَتُهُمْ شَيْئًا وَلَا يُنقِذُونِ ﴿٢٣﴾ إِنِّي إِذًا لَّفِي ضَلَالٍۢ مُّبِينٍۢ ﴿٢٤﴾ إِنِّي آمَنتُ بِرَبِّكُمْ فَٱسْمَعُونِ ﴿٢٥﴾ قِيلَ ٱدْخُلِ ٱلْجَنَّةَ قَالَ يَٰلَيْتَ قَوْمِي يَعْلَمُونَ ﴿٢٦﴾ بِمَا غَفَرَ لِي رَبِّي وَجَعَلَنِي مِنَ ٱلْمُكْرَمِينَ ﴿٢٧﴾ وَمَآ أَنزَلْنَا عَلَىٰ قَوْمِهِ مِن بَعْدِهِ مِنْ جُندٍۢ مِّنَ ٱلسَّمَاءِ وَمَا كُنَّا مُنزِلِينَ ﴿٢٨﴾ إِن كَانَتْ إِلَّا صَيْحَةٌۢ وَاحِدَةٌۢ فَإِذَا هُمْ خَامِدُونَ ﴿٢٩﴾ يَٰحَسْرَةً عَلَى ٱلْعِبَادِ مَا يَأْتِيهِم مِّن رَّسُولٍ إِلَّا كَانُوا بِهِ يَسْتَهْزِئُونَ ﴿٣٠﴾ أَلَمْ يَرَوْا كَمْ أَهْلَكْنَا قَبْلَهُم مِّنَ ٱلْقُرُونِ أَنَّهُمْ إِلَيْهِمْ لَا يَرْجِعُونَ ﴿٣١﴾ وَإِن كُلٌّۢ لَّمَّا جَمِيعٌۢ لَّدَيْنَا مُحْضَرُونَ ﴿٣٢﴾`,

  // Page 3: Verses 33-50 - Zeichen der Schöpfung (Nacht, Tag, Sonne, Mond)
  `وَآيَةٌ لَّهُمُ ٱلَّيْلُ نَسْلَخُ مِنْهُ ٱلنَّهَارَ فَإِذَا هُم مُّظْلِمُونَ ﴿٣٣﴾ وَٱلشَّمْسُ تَجْرِي لِمُسْتَقَرٍّۢ لَّهَا ذَٰلِكَ تَقْدِيرُ ٱلْعَزِيزِ ٱلْعَلِيمِ ﴿٣٤﴾ وَٱلْقَمَرَ قَدَّرْنَاهُ مَنَازِلَ حَتَّىٰ عَادَ كَٱلْعُرْجُونِ ٱلْقَدِيمِ ﴿٣٥﴾ لَا ٱلشَّمْسُ يَنبَغِي لَهَآ أَن تُدْرِكَ ٱلْقَمَرَ وَلَا ٱلَّيْلُ سَابِقُ ٱلنَّهَارِ وَكُلٌّۢ فِي فَلَكٍۢ يَسْبَحُونَ ﴿٣٦﴾ وَآيَةٌ لَّهُمْ أَنَّا حَمَلْنَا ذُرِّيَّتَهُمْ فِي ٱلْفُلْكِ ٱلْمَشْحُونِ ﴿٣٧﴾ وَخَلَقْنَا لَهُم مِّن مِّثْلِهِ مَا يَرْكَبُونَ ﴿٣٨﴾ وَإِن نَّشَأْ نُغْرِقْهُمْ فَلَا صَرِيخَ لَهُمْ وَلَا هُمْ يُنقَذُونَ ﴿٣٩﴾ إِلَّا رَحْمَةٌۢ مِّنَّا وَمَتَاعٌۢ إِلَىٰ حِينٍۢ ﴿٤٠﴾ وَإِذَا قِيلَ لَهُمُ ٱتَّقُوا مَا بَيْنَ أَيْدِيكُمْ وَمَا خَلْفَكُمْ لَعَلَّكُمْ تُرْحَمُونَ ﴿٤١﴾ وَمَا تَأْتِيهِم مِّنْ آيَةٍۢ مِّنْ آيَاتِ رَبِّهِمْ إِلَّا كَانُوا عَنْهَا مُعْرِضِينَ ﴿٤٢﴾ وَإِذَا قِيلَ لَهُمْ أَنفِقُوا مِمَّا رَزَقَكُمُ ٱللَّهُ قَالَ ٱلَّذِينَ كَفَرُوا لِلَّذِينَ آمَنُوا أَنُطْعِمُ مَن لَّوْ يَشَاءُ ٱللَّهُ أَطْعَمَهُ إِن أَنتُمْ إِلَّا فِي ضَلَالٍۢ مُّبِينٍۢ ﴿٤٣﴾ وَيَقُولُونَ مَتَىٰ هَٰذَا ٱلْوَعْدُ إِن كُنتُمْ صَادِقِينَ ﴿٤٤﴾ مَا يَنظُرُونَ إِلَّا صَيْحَةٌۢ وَاحِدَةٌۢ تَأْخُذُهُمْ وَهُمْ يَخِصِّمُونَ ﴿٤٥﴾ فَلَا يَسْتَطِيعُونَ تَوْصِيَةًۢ وَلَآ إِلَىٰ أَهْلِهِمْ يَرْجِعُونَ ﴿٤٦﴾ وَنُفِخَ فِي ٱلصُّورِ فَإِذَا هُم مِّنَ ٱلْأَجْدَاثِ إِلَىٰ رَبِّهِمْ يَنسِلُونَ ﴿٤٧﴾ قَالُوا يَٰوَيْلَنَا مَن بَعَثَنَا مِن مَّرْقَدِنَا هَٰذَا مَا وَعَدَ ٱلرَّحْمَٰنُ وَصَدَقَ ٱلْمُرْسَلُونَ ﴿٤٨﴾ إِن كَانَتْ إِلَّا صَيْحَةٌۢ وَاحِدَةٌۢ فَإِذَا هُمْ جَمِيعٌۢ لَّدَيْنَا مُحْضَرُونَ ﴿٤٩﴾ فَٱلْيَوْمَ لَا تُظْلَمُ نَفْسٌۢ شَيْئًا وَلَا تُجْزَوْنَ إِلَّا مَا كُنتُمْ تَعْمَلُونَ ﴿٥٠﴾`,

  // Page 4: Verses 51-67 - Bewohner des Paradieses und Warnung an die Ungläubigen
  `إِنَّ أَصْحَابَ ٱلْجَنَّةِ ٱلْيَوْمَ فِي شُغُلٍۢ فَاكِهُونَ ﴿٥١﴾ هُمْ وَأَزْوَاجُهُمْ فِي ظِلَالٍۢ عَلَى ٱلْأَرَآئِكِ مُتَّكِئُونَ ﴿٥٢﴾ لَهُمْ فِيهَا فَاكِهَةٌۢ وَلَهُم مَّا يَدْعُونَ ﴿٥٣﴾ سَلَامٌۢ قَوْلًا مِّن رَّبٍّۢ رَّحِيمٍۢ ﴿٥٤﴾ وَٱمْتَازُوا ٱلْيَوْمَ أَيُّهَا ٱلْمُجْرِمُونَ ﴿٥٥﴾ أَلَمْ أَعْهَدْ إِلَيْكُمْ يَٰبَنِي آدَمَ أَن لَّا تَعْبُدُوا ٱلشَّيْطَانَ إِنَّهُ لَكُمْ عَدُوٌّۢ مُّبِينٌۢ ﴿٥٦﴾ وَأَنِ ٱعْبُدُونِ هَٰذَا صِرَاطٌۢ مُّسْتَقِيمٌۢ ﴿٥٧﴾ وَلَقَدْ أَضَلَّ مِنكُمْ جِبِلًّا كَثِيرًا أَفَلَمْ تَكُونُوا تَعْقِلُونَ ﴿٥٨﴾ هَٰذِهِ جَهَنَّمُ ٱلَّتِي كُنتُمْ تُوعَدُونَ ﴿٥٩﴾ ٱصْلَوْهَا ٱلْيَوْمَ بِمَا كُنتُمْ تَكْفُرُونَ ﴿٦٠﴾ ٱلْيَوْمَ نَخْتِمُ عَلَىٰ أَفْوَاهِهِمْ وَتُكَلِّمُنَا أَيْدِيهِمْ وَتَشْهَدُ أَرْجُلُهُم بِمَا كَانُوا يَكْسِبُونَ ﴿٦١﴾ وَلَوْ نَشَاءُ لَمَسَحْنَا عَلَىٰ أَعْيُنِهِمْ فَٱسْتَبَقُوا ٱلصِّرَاطَ فَأَنَّىٰ يُبْصِرُونَ ﴿٦٢﴾ وَلَوْ نَشَاءُ لَمَسَخْنَاهُمْ عَلَىٰ مَكَانَتِهِمْ فَمَا ٱسْتَطَاعُوا مُضِيًّا وَلَا يَرْجِعُونَ ﴿٦٣﴾ وَمَن نُّعَمِّرْهُ نُنَكِّسْهُ فِي ٱلْخَلْقِ أَفَلَا يَعْقِلُونَ ﴿٦٤﴾ وَمَا عَلَّمْنَاهُ ٱلشِّعْرَ وَمَا يَنبَغِي لَهُ إِن هُوَ إِلَّا ذِكْرٌۢ وَقُرْآنٌۢ مُّبِينٌۢ ﴿٦٥﴾ لِّنُنذِرَ مَن كَانَ حَيًّا وَيَحِقَّ ٱلْقَوْلُ عَلَى ٱلْكَافِرِينَ ﴿٦٦﴾ أَوَلَمْ يَرَوْا أَنَّا خَلَقْنَا لَهُمْ مِّمَّا عَمِلَتْ أَيْدِينَا أَنْعَامًۢا فَهُمْ لَهَا مَالِكُونَ ﴿٦٧﴾`,

  // Page 5: Verses 68-79 - Wunder der Schöpfung: Tiere, Feuer, Auferstehung
  `وَذَلَّلْنَاهَا لَهُمْ فَمِنْهَا رَكُوبُهُمْ وَمِنْهَا يَأْكُلُونَ ﴿٦٨﴾ وَلَهُمْ فِيهَا مَنَافِعُ وَمَشَارِبُ أَفَلَا يَشْكُرُونَ ﴿٦٩﴾ وَٱتَّخَذُوا مِن دُونِ ٱللَّهِ آلِهَةً لَّعَلَّهُمْ يُنصَرُونَ ﴿٧٠﴾ لَا يَسْتَطِيعُونَ نَصْرَهُمْ وَهُمْ لَهُمْ جُندٌۢ مُّحْضَرُونَ ﴿٧١﴾ فَلَا يَحْزُنكَ قَوْلُهُمْ إِنَّا نَعْلَمُ مَا يُسِرُّونَ وَمَا يُعْلِنُونَ ﴿٧٢﴾ أَوَلَمْ يَرَ ٱلْإِنسَانُ أَنَّا خَلَقْنَاهُ مِن نُّطْفَةٍۢ فَإِذَا هُوَ خَصِيمٌۢ مُّبِينٌۢ ﴿٧٣﴾ وَضَرَبَ لَنَا مَثَلًا وَنَسِيَ خَلْقَهُ قَالَ مَن يُحْيِي ٱلْعِظَامَ وَهِيَ رَمِيمٌۢ ﴿٧٤﴾ قُلْ يُحْيِيهَا ٱلَّذِي أَنشَأَهَآ أَوَّلَ مَرَّةٍۢ وَهُوَ بِكُلِّ خَلْقٍ عَلِيمٌۢ ﴿٧٥﴾ ٱلَّذِي جَعَلَ لَكُم مِّنَ ٱلشَّجَرِ ٱلْأَخْضَرِ نَارًۢا فَإِذَا أَنتُم مِّنْهُ تُوقِدُونَ ﴿٧٦﴾ أَوَلَيْسَ ٱلَّذِي خَلَقَ ٱلسَّمَاوَاتِ وَٱلْأَرْضَ بِقَادِرٍ عَلَىٰ أَن يَخْلُقَ مِثْلَهُم بَلَىٰ وَهُوَ ٱلْخَلَّاقُ ٱلْعَلِيمُ ﴿٧٧﴾ إِنَّمَا أَمْرُهُ إِذَآ أَرَادَ شَيْئًا أَن يَقُولَ لَهُ كُن فَيَكُونُ ﴿٧٨﴾ فَسُبْحَانَ ٱلَّذِي بِيَدِهِ مَلَكُوتُ كُلِّ شَيْءٍۢ وَإِلَيْهِ تُرْجَعُونَ ﴿٧٩﴾`,

  // Page 6: Verses 80-83 - Abschließende Verse: Warnung und Hoffnung
  `وَمَن يَكْفُرْ بِهِ فَأُولَٰٓئِكَ هُمُ ٱلْأَسْقَمُونَ ﴿٨٠﴾ أَفَلَمْ يَرَوْا كَمْ أَهْلَكْنَا قَبْلَهُم مِّنَ ٱلْقُرُونِ أَنَّهُمْ إِلَيْهِمْ لَا يَرْجِعُونَ ﴿٨١﴾ وَإِن كُلٌّۢ لَّمَّا جَمِيعٌۢ لَّدَيْنَا مُحْضَرُونَ ﴿٨٢﴾ وَآيَةٌۢ لَّهُمُ ٱلْأَرْضُ ٱلْمَيْتَةُ أَحْيَيْنَاهَا وَأَخْرَجْنَا مِنْهَا حَبًّا فَمِنْهُ يَأْكُلُونَ ﴿٨٣﴾`,
];

// Yâsîn Modal Component
function YasinModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) < 50) return; // Minimum swipe distance

    if (diff > 0) {
      // Swiped left, go to next page
      if (currentPage < YASIN_PAGES.length - 1) {
        setDirection("left");
        setTimeout(() => setCurrentPage((p) => p + 1), 150);
      }
    } else {
      // Swiped right, go to previous page
      if (currentPage > 0) {
        setDirection("right");
        setTimeout(() => setCurrentPage((p) => p - 1), 150);
      }
    }
    setDirection(null);
  };

  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="yasinModal" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <button className="closeBtn" onClick={onClose}>
            ✕
          </button>
          <div className="modalTitle">Yâsîn Sûresi</div>
          <div className="pageCounter">
            {currentPage + 1} / {YASIN_PAGES.length}
          </div>
        </div>

        <div
          className={`modalContent ${direction ? `slide-${direction}` : ""}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="yasinText">{YASIN_PAGES[currentPage]}</div>
        </div>

        <div className="modalFooter">
          <button
            className="btn"
            onClick={() => {
              if (currentPage > 0) {
                setDirection("right");
                setTimeout(() => setCurrentPage((p) => p - 1), 150);
              }
            }}
            disabled={currentPage === 0}
            style={{ opacity: currentPage > 0 ? "1" : "0.5" }}
          >
            ← Vorherige
          </button>
          <button
            className="btn"
            onClick={() => {
              if (currentPage < YASIN_PAGES.length - 1) {
                setDirection("left");
                setTimeout(() => setCurrentPage((p) => p + 1), 150);
              }
            }}
            disabled={currentPage === YASIN_PAGES.length - 1}
            style={{
              opacity: currentPage === YASIN_PAGES.length - 1 ? "0.5" : "1",
            }}
          >
            Nächste →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [completedBoxes, setCompletedBoxes] = useState<number[]>([]);
  const [tesbihCounts, setTesbihCounts] = useState<Record<string, number>>({});
  const [tesbihIndex, setTesbihIndex] = useState(0);
  const [currentTab, setCurrentTab] = useState<"namaz" | "tesbih">("namaz");
  const [toast, setToast] = useState({ message: "", show: false });
  const [celebration, setCelebration] = useState({ message: "", show: false });
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({});
  const [yasinModalOpen, setYasinModalOpen] = useState(false);

  const LS_PROGRESS = "berat_progress_v2";
  const LS_TESBIH = "berat_tesbih_v2";
  const LS_TESBIH_INDEX = "berat_tesbih_index_v2";

  const tesbihTasks = [
    {
      key: "istigfar",
      name: "İstiğfâr ı şerîf",
      target: 14,
      arabic: "أَسْتَغْفِرُ اللهَ الْعَظِيمَ وَأَتُوبُ إِلَيْهِ",
      latin: "Estağfirullâhel azîm ve etûbü ileyh",
      hint: "14 kere okunur",
    },
    {
      key: "salavat1",
      name: "Salevât ı şerîfe",
      target: 14,
      arabic:
        "اَللّٰهُمَّ صَلِّ عَلٰى سَيِّدِنَا مُحَمَّدٍ وَعَلٰى اٰلِ سَيِّدِنَا مُحَمَّدٍ",
      latin:
        "Allâhümme salli alâ seyyidinâ Muhammedin ve alâ âli seyyidinâ Muhammed",
      hint: "14 kere okunur",
    },
    {
      key: "fatiha",
      name: "Fâtiha i şerîfe",
      target: 14,
      arabic:
        "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحٖيمِ ❁ اَلْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمٖينَ ❁ اَلرَّحْمٰنِ الرَّحٖيمِ ❁ مَالِكِ يَوْمِ الدّٖينِ ❁ اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعٖينُ ❁ اِهْدِنَا الصِّرَاطَ الْمُسْتَقٖيمَ ❁ صِرَاطَ الَّذٖينَ اَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّٓالّٖينَ",
      latin:
        "Bismillâhirrahmânirrahîm. Elhamdü lillâhi rabbil âlemîn. Errahmânirrahîm. Mâliki yevmiddîn. İyyâke na'büdü ve iyyâke nesteîn. İhdinassırâtal müstakîm. Sırâtallezîne en'amte aleyhim ğayril mağdûbi aleyhim veleddâllîn.",
      hint: "Besmele ile 14 kere",
    },
    {
      key: "ayetelkursi",
      name: "Âyetü l Kürsî",
      target: 14,
      arabic:
        "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحٖيمِ ❁ اَللّٰهُ لَٓا اِلٰهَ اِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمٰوَاتِ وَمَا فِي الْاَرْضِ مَنْ ذَا الَّذٖي يَشْفَعُ عِنْدَهُٓ اِلَّا بِاِذْنِهٖ يَعْلَمُ مَا بَيْنَ اَيْدٖيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحٖيطُونَ بِشَيْءٍ مِنْ عِلْمِهٖٓ اِلَّا بِمَا شَٓاءَ وَسِعَ كُرْسِيُّهُ السَّمٰوَاتِ وَالْاَرْضَ وَلَا يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظٖيمُ",
      latin:
        "Bismillâhirrahmânirrahîm. Allâhü lâ ilâhe illâ hüvel hayyül kayyûm... (tam metin yukarıdaki Arapça)",
      hint: "Besmele ile 14 kere",
    },
    {
      key: "lekad",
      name: "Tevbe Sûresi son 2 âyet",
      target: 14,
      arabic:
        "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحٖيمِ ❁ لَقَدْ جَٓاءَكُمْ رَسُولٌ مِنْ اَنْفُسِكُمْ عَزٖيزٌ عَلَيْهِ مَا عَنِتُّمْ حَرٖيصٌ عَلَيْكُمْ بِالْمُؤْمِنٖينَ رَؤُوفٌ رَحٖيمٌ ❁ فَاِنْ تَوَلَّوْا فَقُلْ حَسْبِيَ اللّٰهُ لَٓا اِلٰهَ اِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظٖيمِ",
      latin:
        "Bismillâhirrahmânirrahîm. Lekad câeküm resûlün... Fein tevellev fekul hasbiyallâh...",
      hint: "Besmele ile 14 kere",
    },
    {
      key: "yasin",
      name: "14 kere Yâsîn deyip sonra 1 Yâsîn Sûresi",
      target: 15,
      arabic: null,
      latin: null,
      hint: "İlk 14 artı Yâsîn sayımı, 15inci artı Yâsîn Sûresi okundu olarak düşün",
    },
    {
      key: "ihlas",
      name: "İhlâs ı şerîf",
      target: 14,
      arabic:
        "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحٖيمِ ❁ قُلْ هُوَ اللّٰهُ اَحَدٌ ❁ اَللّٰهُ الصَّمَدُ ❁ لَمْ يَلِدْ وَلَمْ يُولَدْ ❁ وَلَمْ يَكُنْ لَهُ كُفُوًا اَحَدٌ",
      latin:
        "Bismillâhirrahmânirrahîm. Kul hüvallâhü ehad... Ve lem yekün lehû küfüven ehad.",
      hint: "Besmele ile 14 kere",
    },
    {
      key: "felak",
      name: "Felak Sûresi",
      target: 14,
      arabic:
        "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحٖيمِ ❁ قُلْ اَعُوذُ بِرَبِّ الْفَلَقِ ❁ مِنْ شَرِّ مَا خَلَقَ ❁ وَمِنْ شَرِّ غَاسِقٍ اِذَا وَقَبَ ❁ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ❁ وَمِنْ شَرِّ حَاسِدٍ اِذَا حَسَدَ",
      latin: "Bismillâhirrahmânirrahîm. Kul eûzü birabbil felak...",
      hint: "Besmele ile 14 kere",
    },
    {
      key: "nas",
      name: "Nâs Sûresi",
      target: 14,
      arabic:
        "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحٖيمِ ❁ قُلْ اَعُوذُ بِرَبِّ النَّاسِ ❁ مَلِكِ النَّاسِ ❁ اِلٰهِ النَّاسِ ❁ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ❁ اَلَّذٖي يُوَسْوِسُ فٖي صُدُورِ النَّاسِ ❁ مِنَ الْجِنَّةِ وَالنَّاسِ",
      latin: "Bismillâhirrahmânirrahîm. Kul eûzü birabbin nâs...",
      hint: "Besmele ile 14 kere",
    },
    {
      key: "tesbih",
      name: "Sübhânellâhi ve l hamdü...",
      target: 14,
      arabic:
        "سُبْحَانَ اللّٰهِ وَالْحَمْدُ لِلّٰهِ وَلَٓا اِلٰهَ اِلَّا اللّٰهُ وَاللّٰهُ اَكْبَرُ وَلَا حَوْلَ وَلَا قُوَّةَ اِلَّا بِاللّٰهِ الْعَلِيِّ الْعَظٖيمِ",
      latin:
        "Sübhânallâhi vel hamdü lillâhi ve lâ ilâhe illallâhü vallâhü ekber ve lâ havle ve lâ kuvvete illâ billâhil aliyyil azîm",
      hint: "14 kere okunur",
    },
    {
      key: "salavat2",
      name: "Salevât ı şerîfe (Salât ı Münciye daha faziletlidir)",
      target: 14,
      arabic:
        "اَللّٰهُمَّ صَلِّ عَلٰى سَيِّدِنَا مُحَمَّدٍ وَعَلٰى اٰلِ سَيِّدِنَا مُحَمَّدٍ صَلَاةً تُنْجٖينَا بِهَا مِنْ جَمٖيعِ الْاَهْوَالِ وَالْاٰفَاتِ وَتَقْضٖي لَنَا بِهَا جَمٖيعَ الْحَاجَاتِ وَتُطَهِّرُنَا بِهَا مِنْ جَمٖيعِ السَّيِّئَاتِ وَتَرْفَعُنَا بِهَا عِنْدَكَ اَعْلَى الدَّرَجَاتِ وَتُبَلِّغُنَا بِهَا اَقْصَى الْغَايَاتِ مِنْ جَمٖيعِ الْخَيْرَاتِ فِي الْحَيَاةِ وَبَعْدَ الْمَمَاتِ",
      latin:
        "Allâhümme salli alâ seyyidinâ Muhammedin ve alâ âli seyyidinâ Muhammed... (Salât ı Münciye)",
      hint: "14 kere okunur ve dua edilir",
    },
  ];

  useEffect(() => {
    loadState();
    setMounted(true);
  }, []);

  const safeParse = (json: string | null, fallback: any) => {
    try {
      return json ? JSON.parse(json) : fallback;
    } catch {
      return fallback;
    }
  };

  const loadState = () => {
    if (typeof window === "undefined") return;
    const boxes = safeParse(localStorage.getItem(LS_PROGRESS), []);
    const counts = safeParse(localStorage.getItem(LS_TESBIH), {});
    let idx = Number(localStorage.getItem(LS_TESBIH_INDEX) || 0);
    if (Number.isNaN(idx) || idx < 0) idx = 0;
    if (idx > tesbihTasks.length - 1) idx = tesbihTasks.length - 1;
    setCompletedBoxes(boxes);
    setTesbihCounts(counts);
    setTesbihIndex(idx);
  };

  const saveNamaz = (boxes: number[]) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(LS_PROGRESS, JSON.stringify(boxes));
  };

  const saveTesbih = (counts: Record<string, number>, idx: number) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(LS_TESBIH, JSON.stringify(counts));
    localStorage.setItem(LS_TESBIH_INDEX, String(idx));
  };

  const vibrateTiny = () => {
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const showToast = (message: string) => {
    // suppress toasts that contain "tamam" (e.g. "Tamamlandı") per user request
    if (message && message.toLowerCase().includes("tamam")) return;
    setToast({ message, show: true });
    setTimeout(() => setToast({ message: "", show: false }), 1400);
  };

  const showCelebration = (message: string) => {
    setCelebration({ message, show: true });
    // show for ~3 seconds
    setTimeout(() => setCelebration({ message: "", show: false }), 3000);
  };

  const toggleCard = (cardId: string) => {
    setOpenCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const toggleBox = (index: number) => {
    vibrateTiny();
    const set = new Set(completedBoxes);
    if (set.has(index)) {
      set.delete(index);
      showToast("Geri alındı");
    } else {
      set.add(index);
      // keep the normal toast suppressed for "tamam" but still vibrate
    }
    const updated = Array.from(set).sort((a, b) => a - b);
    setCompletedBoxes(updated);
    saveNamaz(updated);
    // celebratory popup on every 10 completed boxes
    if (updated.length > 0 && updated.length % 10 === 0) {
      const rekat = updated.length * 2;
      if (updated.length === totalBoxes) {
        showCelebration("MaşAllah! Tamamlandı. Şimdi tesbihat a geçebilirsin");
      } else {
        showCelebration(`${rekat} rekat tamamlandi`);
      }
    }
  };

  const getCount = (key: string) => {
    return Number(tesbihCounts[key] || 0);
  };

  const updateCount = (key: string, value: number) => {
    const updated = { ...tesbihCounts, [key]: Math.max(0, value) };
    setTesbihCounts(updated);
    saveTesbih(updated, tesbihIndex);
    return updated;
  };

  const computeOverallDone = () => {
    let done = 0;
    for (const t of tesbihTasks) {
      if (getCount(t.key) >= t.target) done += 1;
    }
    return done;
  };

  const handleInc = () => {
    vibrateTiny();
    const t = tesbihTasks[tesbihIndex];
    const c = getCount(t.key);
    if (c >= t.target) {
      showToast("Hedef tamam");
      return;
    }
    updateCount(t.key, c + 1);
    if (c + 1 >= t.target) {
      showToast("Madde tamam");
      setTimeout(() => handleAdvanceIfDone(), 280);
    }
  };

  const handleDec = () => {
    vibrateTiny();
    const t = tesbihTasks[tesbihIndex];
    const c = getCount(t.key);
    if (c > 0) {
      updateCount(t.key, c - 1);
    }
  };

  const handleResetTask = () => {
    updateCount(tesbihTasks[tesbihIndex].key, 0);
    showToast("Sıfırlandı");
  };

  const handleAdvanceIfDone = () => {
    const t = tesbihTasks[tesbihIndex];
    if (getCount(t.key) >= t.target) {
      const next = Math.min(tesbihIndex + 1, tesbihTasks.length - 1);
      if (next !== tesbihIndex) {
        showToast("Sonraki madde");
        setTesbihIndex(next);
        saveTesbih(tesbihCounts, next);
      } else {
        showToast("Tesbihat tamam");
      }
    }
  };

  const handleGoToTask = (idx: number) => {
    let newIdx = idx;
    if (newIdx < 0) newIdx = 0;
    if (newIdx > tesbihTasks.length - 1) newIdx = tesbihTasks.length - 1;
    setTesbihIndex(newIdx);
    saveTesbih(tesbihCounts, newIdx);
  };

  const handleResetTesbih = () => {
    if (!confirm("Tesbihat ilerlemesi sıfırlansın mı")) return;
    setTesbihCounts({});
    setTesbihIndex(0);
    saveTesbih({}, 0);
    showToast("Tesbihat sıfırlandı");
  };

  const handleMarkAllDone = () => {
    if (!confirm("Tüm tesbihat maddeleri tamamlandı yapılsın mı")) return;
    const updated = { ...tesbihCounts };
    for (const t of tesbihTasks) {
      updated[t.key] = t.target;
    }
    setTesbihCounts(updated);
    saveTesbih(updated, tesbihIndex);
    showToast("Hepsi tamam");
  };

  const resetEverything = () => {
    if (!confirm("Tüm namaz ve tesbihat ilerlemesi sıfırlansın mı")) return;
    if (typeof window === "undefined") return;
    localStorage.removeItem(LS_PROGRESS);
    localStorage.removeItem(LS_TESBIH);
    localStorage.removeItem(LS_TESBIH_INDEX);
    setCompletedBoxes([]);
    setTesbihCounts({});
    setTesbihIndex(0);
    showToast("Sıfırlandı");
  };

  const totalBoxes = 50;
  const selamDone = completedBoxes.length;
  const pct = (selamDone / totalBoxes) * 100;

  const completedSet = new Set(completedBoxes);
  let nextBox = -1;
  for (let i = 0; i < totalBoxes; i++) {
    if (!completedSet.has(i)) {
      nextBox = i;
      break;
    }
  }

  const currentTask = tesbihTasks[tesbihIndex];
  const currentCount = getCount(currentTask.key);
  const overallDone = computeOverallDone();

  const isFirstTask = tesbihIndex === 0;
  const isLastTask = tesbihIndex === tesbihTasks.length - 1;

  if (!mounted) return null;

  return (
    <>
      <div className={`celebrationRoot ${celebration.show ? "show" : ""}`}>
        <div className={`celebration ${celebration.show ? "show" : ""}`}>
          <div className="celebrationText">{celebration.message}</div>
          <div className="confetti">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <header>
        <div className="topbar">
          <div style={{ width: "40px" }}></div>
          <div className="titleblock">
            <h1>Berât Gecesi</h1>
            <div className="subtitle">100 rekat namaz takibi ve tesbihat</div>
          </div>
          <button
            className="iconbtn"
            onClick={resetEverything}
            title="Sıfırla"
            aria-label="Sıfırla"
          >
            ↺
          </button>
        </div>

        <div className="wrap" style={{ padding: "0" }}>
          <div className="segmented" role="tablist" aria-label="Bölümler">
            <button
              className={`segbtn ${currentTab === "namaz" ? "active" : ""}`}
              role="tab"
              aria-selected={currentTab === "namaz"}
              onClick={() => setCurrentTab("namaz")}
            >
              Namaz takibi
            </button>
            <button
              className={`segbtn ${currentTab === "tesbih" ? "active" : ""}`}
              role="tab"
              aria-selected={currentTab === "tesbih"}
              onClick={() => setCurrentTab("tesbih")}
            >
              Tesbihat takibi
            </button>
          </div>
        </div>
      </header>

      <div className="wrap">
        {currentTab === "namaz" ? (
          <>
            <div
              className={`card ${openCards["cardNiyet"] ? "open" : ""}`}
              id="cardNiyet"
            >
              <div
                className="cardHeader"
                onClick={() => toggleCard("cardNiyet")}
              >
                <div className="left">
                  <div className="badge">📖</div>
                  <div>Niyet ve tarif</div>
                </div>
                <div className="chev">⌄</div>
              </div>
              <div className="cardBody">
                <div className="quote">
                  "Yâ Rabbi! Niyet ettim senin rızâ yı şerîfin için namaza. Beni
                  afv ı İlâhî ne, feyz i İlâhî ne mazhar eyle. Kasvet i kalpten,
                  dünya ve âhiret sıkıntılarından halâs eyleyip saîdler
                  defterine kaydeyle."
                  <div style={{ marginTop: "8px", color: "var(--muted)" }}>
                    Allâhü Ekber
                  </div>
                </div>
                <div className="note">
                  Her rekâtta Fâtiha dan sonra 10 İhlâs okunur. 2 rekâtta bir
                  selâm verilir. Böylece 100 rekâta tamamlanır.
                </div>
              </div>
            </div>

            <div
              className={`card ${openCards["cardFazilet"] ? "open" : ""}`}
              id="cardFazilet"
            >
              <div
                className="cardHeader"
                onClick={() => toggleCard("cardFazilet")}
              >
                <div className="left">
                  <div className="badge">⭐</div>
                  <div>Berât Gecesinin Faziletleri</div>
                </div>
                <div className="chev">⌄</div>
              </div>
              <div className="cardBody">
                <div className="info-content" id="faziletContent">
                  <p>
                    Sevgili Peygamber Efendimiz sallallâhü aleyhi ve sellem
                    şöyle buyurdular:
                  </p>

                  <ul style={{ paddingLeft: 20, margin: "10px 0" }}>
                    <li>
                      Şâbân(-ı şerîf) ayının on beşinci (yani Berât) gecesi
                      olduğu zaman, gecesini ibadetle geçirin, gündüzünde de
                      oruç tutun.
                    </li>
                    <li>
                      Her kim bu (Berât) gece(sinde) yüz rekât namaz kılarsa,
                      Allâhü Teâlâ, ona, yüz melek gönderir. Bunlardan otuzu,
                      ona Cennet’i müjdeler, otuzu Cehennem azâbından emniyette
                      olduğunu söyler, otuzu da dünya âfetlerini ondan geri
                      çevirir. On melek de o kimseyi, şeytanın tuzaklarından
                      muhafaza eder.
                    </li>
                    <li>
                      Kim şu beş geceyi ihyâ ederse o kimseye Cennet vacip olur:
                      Terviye gecesi (Arefe’den önceki gece), Arefe gecesi,
                      Kurban Bayramı gecesi, Ramazan Bayramı gecesi, Şâban(-ı
                      şerîf) ayının on beşinci gecesi.
                    </li>
                  </ul>

                  <p>
                    <strong>
                      Berât Gecesi’nin husûsiyetlerinden bazıları:
                    </strong>
                  </p>

                  <ul style={{ paddingLeft: 20, margin: "10px 0" }}>
                    <li>
                      Hikmetli her iş -kulların rızıkları, ecelleri, vesâir
                      işleri- bu gecede ayırt edilir; yazılır.
                    </li>
                    <li>Bu gecede ibadet etmek çok faziletlidir.</li>
                    <li>
                      Bu gecede rahmet iner. Hadîs-i şerifte, “Şâban ayının
                      yarısı olduğu gecede, Allâhü Teâlâ (rahmetiyle) dünya
                      semâsına tecellî eder…” buyurulmuştur.
                    </li>
                    <li>Müminler mağfiret olunur, günahları bağışlanır.</li>
                    <li>
                      Resûlullah (s.a.v.) Efendimize tam şefaat salâhiyeti bu
                      gecede verilmiştir. Sevgili Peygamberimiz (s.a.v.),
                      Şâbân-ı şerîf ayının on üçüncü gecesinde Allâhü Teâlâ’dan,
                      ümmeti için şefaat izni istedi. Allâhü Teâlâ, ümmetinin
                      üçte birine şefaat izni verdi. On dördüncü gecesi, kalan
                      ümmeti için şefaat izni istedi. Allâhü Teâlâ, ümmetinin
                      üçte ikisine şefaat izni verdi. On beşinci gecesi, kalan
                      ümmeti için şefaat izni istedi. Allâhü Teâlâ -devenin,
                      sahibinden kaçtığı gibi, Allâhü Teâlâ’dan kaçanlar hâriç-
                      ümmetinin tamamına şefaat etmesine izin verdi.
                    </li>
                    <li>
                      Bu gecede Zemzem Suyu’nun âşikâr bir şekilde artması,
                      Allâhü Teâlâ’nın bir sünneti (âdet-i İlâhiyye’si)dir.
                      Bunda İlâhî ilimlerin, hakikat ehlinin kalbinde artacağına
                      işaret vardır.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card" id="screenNamaz">
              <div className="panel">
                <div className="stats">
                  <div className="label">İlerleme</div>
                  <div className="value">{selamDone} / 50 selâm</div>
                </div>

                <div className="helper">
                  <div className="dot"></div>
                  <div>Her 2 rekât kıldıktan sonra bir kutucuğa dokun</div>
                </div>

                <div className="grid">
                  {Array.from({ length: totalBoxes }).map((_, i) => (
                    <div
                      key={i}
                      className={`box ${completedSet.has(i) ? "completed" : ""} ${
                        i === nextBox ? "next" : ""
                      }`}
                      onClick={() => toggleBox(i)}
                    >
                      {completedSet.has(i) ? (
                        <div
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: 900,
                            color: "#000",
                          }}
                        >
                          ✓
                        </div>
                      ) : (
                        <div
                          style={{
                            fontSize: "1.1rem",
                            color: "var(--accent)",
                            opacity: 0.5,
                          }}
                        >
                          +
                        </div>
                      )}
                      <div className="boxLabel">{i + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="card" id="screenTesbih">
            <div className="tesbihWrap">
              <div className="tesbihHeader">
                <div>
                  <div className="t1">Namaz sonrası okunacaklar</div>
                  <div className="t2">
                    Her madde için artı/eksi tuşlarını kullan. Hedefe
                    ulaştığında yeşil olur.
                  </div>
                </div>
                <div className="pill">
                  {overallDone} / {tesbihTasks.length}
                </div>
              </div>

              <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
                <button
                  className="btn danger"
                  onClick={handleResetTesbih}
                  style={{ flex: 1 }}
                >
                  Tesbihatı sıfırla
                </button>
                <button
                  className="btn"
                  onClick={handleMarkAllDone}
                  style={{ flex: 1 }}
                >
                  Hepsini tamamlandı yap
                </button>
              </div>

              {tesbihTasks.map((task, idx) => {
                const taskCount = getCount(task.key);
                const isDone = taskCount >= task.target;
                return (
                  <div
                    key={task.key}
                    className={`card ${openCards[`tesbih_${task.key}`] ? "open" : ""}`}
                    style={{ marginTop: "12px" }}
                  >
                    <div
                      className="cardHeader"
                      onClick={() => toggleCard(`tesbih_${task.key}`)}
                    >
                      <div className="left">
                        <div
                          className={`badge ${isDone ? "completed" : ""}`}
                          style={{
                            background: isDone
                              ? "var(--accent)"
                              : "var(--accent2)",
                            color: isDone ? "#000" : "var(--accent)",
                          }}
                        >
                          {isDone ? "✓" : taskCount}
                        </div>
                        <div>
                          <div style={{ fontWeight: 720 }}>{task.name}</div>
                          <div
                            style={{
                              fontSize: "0.85rem",
                              color: "var(--muted)",
                              marginTop: "2px",
                            }}
                          >
                            {taskCount} / {task.target}
                          </div>
                        </div>
                      </div>
                      <div className="chev">⌄</div>
                    </div>
                    <div className="cardBody">
                      {task.arabic && (
                        <div className="arabic">{task.arabic}</div>
                      )}
                      {task.latin && <div className="latin">{task.latin}</div>}
                      <div className="taskHint">{task.hint}</div>

                      {task.key === "yasin" && (
                        <div
                          style={{ marginTop: "12px", marginBottom: "12px" }}
                        >
                          <button
                            className="btn"
                            onClick={() => setYasinModalOpen(true)}
                            style={{ width: "100%" }}
                          >
                            📖 Yâsîn Sûresi
                          </button>
                        </div>
                      )}

                      <div className="divider"></div>

                      <div className="tesbihBtns">
                        <button
                          className="btn danger"
                          onClick={() =>
                            updateCount(task.key, Math.max(0, taskCount - 1))
                          }
                          disabled={taskCount === 0}
                          style={{ opacity: taskCount > 0 ? "1" : "0.55" }}
                        >
                          −
                        </button>
                        <button
                          className="btn"
                          onClick={() => updateCount(task.key, 0)}
                        >
                          🔄
                        </button>
                        <button
                          className="btn bigPlus"
                          onClick={() => {
                            const newCount = taskCount + 1;
                            updateCount(task.key, newCount);
                            if (newCount >= task.target) {
                              showToast(`${task.name} tamamlandı!`);
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="footer">
        <div className="footerInner">
          <div className="progressRow">
            <div className="left">Toplam rekat</div>
            <div className="right">{selamDone * 2} / 100</div>
          </div>
          <div className="bar" aria-label="İlerleme çubuğu">
            <div className="fill" style={{ width: `${pct.toFixed(2)}%` }}></div>
          </div>
        </div>
      </div>

      <div className={`toast ${toast.show ? "show" : ""}`}>{toast.message}</div>
      <YasinModal
        isOpen={yasinModalOpen}
        onClose={() => setYasinModalOpen(false)}
      />
    </>
  );
}
