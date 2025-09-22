"""
Test script to verify backend components are working
"""

import sys
import os

def test_imports():
    """Test if all required modules can be imported"""
    try:
        print("Testing imports...")
        
        # Test basic imports
        import cv2
        print("✅ OpenCV imported successfully")
        
        import mediapipe as mp
        print("✅ MediaPipe imported successfully")
        
        import numpy as np
        print("✅ NumPy imported successfully")
        
        import flask
        print("✅ Flask imported successfully")
        
        # Test your AI components
        from pose import PoseDetector
        print("✅ PoseDetector imported successfully")
        
        from accurate_rep_counter import AccurateRepCounter
        print("✅ AccurateRepCounter imported successfully")
        
        from cheat_detection_system import CheatDetectionSystem, ExerciseType
        print("✅ CheatDetectionSystem imported successfully")
        
        from research_backed_talent_predictor import ResearchBackedTalentPredictor
        print("✅ ResearchBackedTalentPredictor imported successfully")
        
        from olympic_readiness_system import OlympicReadinessSystem
        print("✅ OlympicReadinessSystem imported successfully")
        
        print("\n🎉 All imports successful! Backend is ready.")
        return True
        
    except ImportError as e:
        print(f"❌ Import error: {e}")
        print("Try running: pip install -r requirements.txt")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_flask_server():
    """Test if Flask server can start"""
    try:
        print("\nTesting Flask server...")
        from simple_flask_server import app
        print("✅ Flask app created successfully")
        return True
    except Exception as e:
        print(f"❌ Flask server error: {e}")
        return False

if __name__ == "__main__":
    print("🏆 SIH Backend Connection Test")
    print("=" * 40)
    
    imports_ok = test_imports()
    flask_ok = test_flask_server()
    
    if imports_ok and flask_ok:
        print("\n✅ Backend is ready to start!")
        print("Run: python simple_flask_server.py")
    else:
        print("\n❌ Backend has issues. Check the errors above.")

