interface Message {
  role: "user" | "assistant";
  content: string;
  category?: "safety" | "health" | "info";
}

export const getAIResponse = (userInput: string, phoneNumber: string): Message => {
  const input = userInput.toLowerCase();
  
  // Safety-related responses
  if (input.includes("danger") || input.includes("threat") || input.includes("unsafe") || 
      input.includes("emergency") || input.includes("help") || input.includes("attack") ||
      input.includes("stalking") || input.includes("harassment") || input.includes("violence")) {
    return {
      role: "assistant",
      content: `I understand you're facing a safety concern. If this is an emergency, please use the "Safety Emergency" button above to immediately alert the nearest police station.\n\nYour safety is paramount. Here are some immediate steps:\n\n1. Move to a safe, public location if possible\n2. Call emergency services (dial 100 or 112)\n3. Contact a trusted friend or family member\n4. Document any evidence (photos, messages)\n\n${phoneNumber ? `I have your phone number (${phoneNumber}) ready to send with emergency alerts.` : "Please add your phone number at the top for emergency alerts."}\n\nWould you like information about women's safety helplines or legal rights?`,
      category: "safety"
    };
  }
  
  // Healthcare-related responses
  if (input.includes("health") || input.includes("medical") || input.includes("doctor") || 
      input.includes("hospital") || input.includes("sick") || input.includes("pain") ||
      input.includes("pregnant") || input.includes("menstrual") || input.includes("gynecologist")) {
    return {
      role: "assistant",
      content: `I'm here to help with healthcare information. For medical emergencies, use the "Health Emergency" button above to alert the nearest hospital.\n\nHere are some women's healthcare resources:\n\n1. Government Hospitals with Women's Health Units\n2. Janani Suraksha Yojana (JSY) - maternal health program\n3. Free health check-ups at Anganwadi centers\n4. PMSMA (Pradhan Mantri Surakshit Matritva Abhiyan)\n\n${phoneNumber ? `Emergency services will receive your contact: ${phoneNumber}` : "Add your phone number for emergency alerts."}\n\nWhat specific health information do you need?`,
      category: "health"
    };
  }
  
  // Government programs and information
  if (input.includes("program") || input.includes("scheme") || input.includes("government") || 
      input.includes("support") || input.includes("benefit") || input.includes("complaint") ||
      input.includes("rights") || input.includes("welfare") || input.includes("subsidy")) {
    return {
      role: "assistant",
      content: `I can help you with information about government and NGO programs for women:\n\n**Major Government Schemes:**\n\n1. **Beti Bachao Beti Padhao** - Girl child education & welfare\n2. **Pradhan Mantri Matru Vandana Yojana** - Maternity benefits\n3. **Mahila Shakti Kendra** - Women empowerment\n4. **National Rural Livelihood Mission** - Skill development\n5. **One Stop Centre Scheme** - Support for violence victims\n\nTo file a complaint about any program:\n- Use the "File Complaint" button above\n- Visit pgportal.gov.in for grievances\n- Call Women's Helpline: 181\n\n${phoneNumber ? `Complaints will include your contact: ${phoneNumber}` : "Add phone number to file authenticated complaints."}\n\nWhich program would you like to know more about?`,
      category: "info"
    };
  }
  
  // Default response
  return {
    role: "assistant",
    content: `I'm here to assist you with:\n\n🛡️ **Safety & Security** - Emergency help, legal rights, harassment support\n💗 **Healthcare** - Medical resources, maternal care, health schemes\nℹ️ **Programs & Rights** - Government schemes, complaints, welfare programs\n\nPlease tell me which area you need help with, or ask your specific question.`,
  };
};
