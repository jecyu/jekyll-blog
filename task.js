function task() {
    // 1.有一个明确的实现的目标
    if (hasClearGoal()) {
        // 2.评估目标并将其拆解成任务（TODO）
        evaluateAndSplit();
        // 3.规划任务的步骤（TODO）
        stepsOfPlanning()
        // 4.学习相关技能
        learnRelatedSkill();
        if (getStuck()) {
            evaluateAndSplit();
        } 
        // 5.执行task，遇到难题就跳到第二步
        executeTask();
    }
}