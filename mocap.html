using System.Collections.Generic;
using UnityEngine;

public class RecordAnimation : MonoBehaviour
{
    private List<KeyframeData> keyframes = new List<KeyframeData>();
    private bool isRecording = false;

    // Data structure to store each frame's data
    [System.Serializable]
    public class KeyframeData
    {
        public Vector3 position;
        public Quaternion rotation;
        public Vector3 scale;
        public float time;
    }

    void Update()
    {
        if (isRecording)
        {
            // Capture object's state each frame
            keyframes.Add(new KeyframeData
            {
                position = transform.position,
                rotation = transform.rotation,
                scale = transform.localScale,
                time = Time.time
            });
        }
    }

    public void StartRecording()
    {
        keyframes.Clear();
        isRecording = true;
    }

    public void StopRecording()
    {
        isRecording = false;
        CreateAnimationClip();
    }

    private void CreateAnimationClip()
    {
        AnimationClip clip = new AnimationClip();

        // Create animation curves for position, rotation, and scale
        AnimationCurve posX = new AnimationCurve();
        AnimationCurve posY = new AnimationCurve();
        AnimationCurve posZ = new AnimationCurve();
        AnimationCurve rotX = new AnimationCurve();
        AnimationCurve rotY = new AnimationCurve();
        AnimationCurve rotZ = new AnimationCurve();
        AnimationCurve rotW = new AnimationCurve();
        AnimationCurve scaleX = new AnimationCurve();
        AnimationCurve scaleY = new AnimationCurve();
        AnimationCurve scaleZ = new AnimationCurve();

        foreach (var frame in keyframes)
        {
            float time = frame.time - keyframes[0].time; // Normalize time
            posX.AddKey(time, frame.position.x);
            posY.AddKey(time, frame.position.y);
            posZ.AddKey(time, frame.position.z);
            rotX.AddKey(time, frame.rotation.x);
            rotY.AddKey(time, frame.rotation.y);
            rotZ.AddKey(time, frame.rotation.z);
            rotW.AddKey(time, frame.rotation.w);
            scaleX.AddKey(time, frame.scale.x);
            scaleY.AddKey(time, frame.scale.y);
            scaleZ.AddKey(time, frame.scale.z);
        }

        // Assign the curves to the clip
        clip.SetCurve("", typeof(Transform), "localPosition.x", posX);
        clip.SetCurve("", typeof(Transform), "localPosition.y", posY);
        clip.SetCurve("", typeof(Transform), "localPosition.z", posZ);
        clip.SetCurve("", typeof(Transform), "localRotation.x", rotX);
        clip.SetCurve("", typeof(Transform), "localRotation.y", rotY);
        clip.SetCurve("", typeof(Transform), "localRotation.z", rotZ);
        clip.SetCurve("", typeof(Transform), "localRotation.w", rotW);
        clip.SetCurve("", typeof(Transform), "localScale.x", scaleX);
        clip.SetCurve("", typeof(Transform), "localScale.y", scaleY);
        clip.SetCurve("", typeof(Transform), "localScale.z", scaleZ);

        // Save the clip to a file
        SaveClip(clip);
    }

    private void SaveClip(AnimationClip clip)
    {
        #if UNITY_EDITOR
        UnityEditor.AssetDatabase.CreateAsset(clip, "Assets/RecordedAnimation.anim");
        UnityEditor.AssetDatabase.SaveAssets();
        #endif
    }
}