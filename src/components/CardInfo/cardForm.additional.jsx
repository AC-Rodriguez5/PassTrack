import {View , Text, TouchableOpacity, ScrollView, TextField} from 'react-native';
import{ ShieldCheck, Copy, Eye, Info, Calendar, Tag, Pencil, Trash2 } from 'lucide-react-native';
import Button from '../button.components'

export default function CardInfoForm(){
    return(
            <View className="bg-white rounded-2xl p-4 mb-4 border border-slate-100 ml-6 mr-6">
                <View className="flex-row items-center mb-3">
                    <Info size={18} color="#3b82f6" />
                    <Text className="ml-2 font-bold text-blue-500 text-sm">
                        Additional Details
                    </Text>
                </View>

                <View className="flex-row items-center mt-3">
                    <Calendar size={18} color="#9CA3AF" />
                    <Text className="ml-1 text-slate-400 font-medium text-sm">
                        Date Added
                    </Text>
                </View>
                <View className="justify-between items-center flex-row  py-1 bg-white pb-3">
                    <View>
                        <Text className="text-sm ml-6 font-semibold text-slate-800  ">
                            August 13,2026 @ 11:11 PM
                        </Text>
                    </View>
               </View>

                <View className="flex-row items-center mt-3">
                    <Tag size={18} color="#9CA3AF" />
                    <Text className="ml-1 text-slate-400 font-medium text-sm">
                        Category
                    </Text>
                </View>

                <View className="justify-between items-center flex-row  bg-white">
                    <View>
                        <Text className="text-sm ml-6 font-semibold text-slate-800 mt-1 bg-indigo-50 px-3 py-1 rounded-xl">
                            Social Media
                        </Text>
                    </View>
               </View>
            </View>

    )
}