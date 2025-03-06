import { ActiveSavedSVG, BathsSVG, BedSVG, MapMarkerSVG, SavedSVG, SmallBathsSVG, SmallBedSVG, SmallMapMarkerSVG } from "@/assets/svgs";
import { FlorenceText } from "@/components/FlorenceText";
import { COLORS } from "@/constants/Colors";
import { useState } from "react";
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { HeaderSection } from "./HeaderSection";
import { ActionsSection } from "./ActionsSection";
import { IMAGES } from "@/constants/theme";
import { Naira } from "@/components/Naira";
import { FeaturedPropertiesSection } from "./FeaturedPropertiesSection";
import { LatestPropertiesSection } from "./LatestPropertiesSection";

function Home() {
  const [action, setAction] = useState("Buy");
  const [saved, setSaved] = useState(false);

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 16,
        backgroundColor: COLORS.background,
      }}
    >
      <View className="flex gap-6 pb-12">
        {/* Header Section */}
        <HeaderSection />
        <View>
          {/* Actions Section */}
          <ActionsSection action={action} setAction={setAction} />
          {/* Featured Properties Sections */}
          <FeaturedPropertiesSection />
          {/* Latest Properties Sections */}
          <LatestPropertiesSection />
          
        </View>
      </View>
    </ScrollView>
  );
}
export default Home;
