import {View , Text, TouchableOpacity, ScrollView, TextField} from 'react-native';
import{ ShieldCheck, Copy, Eye, Info, Calendar, Tag, Pencil, Trash2 } from 'lucide-react-native';

export default function CardInfoForm(){
    return(
            <View className="bg-white rounded-2xl p-4 mb-4 border border-slate-100 ml-6 mr-6">
                <View className="flex-row items-center mb-3">
                    <ShieldCheck size={18} color="#3b82f6" />
                    <Text className="ml-2 font-bold text-blue-500 text-sm">
                        Account Information
                    </Text>
                </View>

                <Text className="text-xs text-slate-400 font-medium mt-3">Email</Text>
                <View className="justify-between items-center flex-row  py-1 bg-white border-b border-slate-100 pb-3">
                    <View>
                        <Text className="text-sm font-semibold text-slate-800 mt-1">
                        ac.rodriguez@gmail.com
                        </Text>
                    </View>
                    <TouchableOpacity className="w-8 h-8 rounded-lg bg-slate-100 items-center justify-center">
                        <Copy size={14} color="#64748b" />
                    </TouchableOpacity>
               </View>

                <Text className="text-xs text-slate-400 font-medium mt-5">Password</Text>
                <View className="justify-between items-center flex-row py-1 pb-3 bg-white border-b border-slate-100">
                    <View>
                        <Text className="text-sm font-semibold text-slate-800 mt-1">
                        *********
                        </Text>
                    </View>

                    <View className="flex-row items-center gap-2">
                        <TouchableOpacity className="w-8 h-8 rounded-lg bg-slate-100 items-center justify-center mr-2">
                            <Eye size={14} color="#64748b" />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-8 h-8 rounded-lg bg-slate-100 items-center justify-center">
                            <Copy size={14} color="#64748b" />
                        </TouchableOpacity>
                    </View>
               </View>

                <Text className="text-xs text-slate-400 font-medium mt-5">Recovery number</Text>
                <View className="justify-between items-center flex-row py-1 pb-3 bg-white border-b border-slate-100">
                    <View>
                        <Text className="text-sm font-semibold text-slate-800 mt-1">
                        (063) 926 231 9067
                        </Text>
                    </View>

                    <View className="flex-row items-center gap-2">
                        <TouchableOpacity className="w-8 h-8 rounded-lg bg-slate-100 items-center justify-center mr-2">
                            <Eye size={14} color="#64748b" />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-8 h-8 rounded-lg bg-slate-100 items-center justify-center">
                            <Copy size={14} color="#64748b" />
                        </TouchableOpacity>
                    </View>
               </View>
            </View>

    )
}